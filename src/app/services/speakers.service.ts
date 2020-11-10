import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { SessionItem, SpeakerItem, SpeakerResponse } from '../speakers/speakers/speaker.model';

@Injectable({
  providedIn: 'root'
})
export class SpeakersService {

  private apiURL = "https://conferenceapi.azurewebsites.net/speakers";

  constructor(private httpClient: HttpClient) { }

  getAllSpeakers(): Observable<SpeakerItem[]> {
    return this.httpClient.get(this.apiURL).pipe(map((response: SpeakerResponse) => {
      return response.collection.items.map((item: any) => {
        return {
          name: item.data[0] ? item.data[0].name : '',
          value: item.data[0] ? item.data[0].value : '',
          descUrl: item.href,
          sessionUrl: item.links[0] ? item.links[0].href : '',
          desc: '...'
        } as SpeakerItem
      })
    }));
  }

  getSpeakerDesc(url): Observable<string> {
    return this.httpClient.get(url, { responseType: 'text' }).pipe(
      debounceTime(200),
      map((response: any) => {
        return response.toString()
      }))
  }

  getSpeakerSession(url): Observable<SessionItem[]> {
    return this.httpClient.get(url).pipe(map((response: SpeakerResponse) => {
      return response.collection.items.map((item: any) => {
        return item.data
      })
    }));
  }

}
