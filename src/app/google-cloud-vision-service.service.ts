import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { google } from '../google';


@Injectable({
providedIn: 'root'
})

export class GoogleCloudVisionServiceService {

  constructor(public http: HttpClient) { }

  getLabels(base64Image, feature) {
    const body = { 'requests': [{
                  'features': [{
                    'type': feature.value,
                    'maxResults': 10
                  }],
                'image': {
                  'content': base64Image}
                }]
              };
    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + google.googleCloudVisionAPIKey, body);
  }
}
