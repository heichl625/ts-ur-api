import { Injectable } from '@nestjs/common';
import { Configuration, CreateChatCompletionRequest, CreateCompletionRequest, OpenAIApi } from "openai"
import axios from 'axios';
import { trimObject } from 'src/helper/object-trim';

@Injectable()
export class OpenaiService {

    private configuration = new Configuration({
        organization: "",
        apiKey: ""
    });

    private openai = new OpenAIApi(this.configuration);


    async listModels(){
        let response = await this.openai.listModels()

        return response.data;
    }

    async chat(){

        let apiResponse = await axios.post('http://localhost:3360/api/graphql', {
            "query": "query events($after: String, $first: Int, $query: String, $languageCode: LanguageCode!){ events(after: $after, first: $first, query: $query)  { pageInfo { endCursor hasNextPage } nodes { claimedPoaCount createdAt description eventId image{ eventImageId height mimeType status url width errors{ code message(languageCode: $languageCode)} } name organizerName poaCount tokenTrackerUrl   }} }",
            "operationName": "events",
            "variables": {
                "after": "",
                "first": 15,
                "query": "",
                "languageCode": "EN"
            }
        }, {
            headers: {
                'Authorization': "Bearer d3rU83bYg823Uc2C"
            }
        })

        let responseData = apiResponse.data;

        if(responseData){
            responseData = trimObject(responseData)
        }

        

        let request: CreateChatCompletionRequest = {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `This is the response data from my api request. Please transform the typescript interface of the response for me. Response: \n${JSON.stringify(responseData)}`
                }
            ]
        } 

        let response = await this.openai.createChatCompletion(request);

        return response.data;

    }

}
