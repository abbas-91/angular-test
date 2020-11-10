import { Component, OnInit } from '@angular/core';
import { SpeakersService } from 'src/app/services/speakers.service';
import { SessionItem, SpeakerItem } from './speaker.model';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss']
})
export class SpeakersComponent implements OnInit {

  constructor(private speakersService: SpeakersService) { }

  speakers: any[] = []
  fetchedIds: string[] = []
  fetchedSessions: string[] = []
  ngOnInit(): void {
    this.getSpeakers()
  }

  getSpeakers() {
    this.speakersService.getAllSpeakers().subscribe((response: SpeakerItem[]) => {
      this.speakers = response
    })
  }

  onMouseOver(speaker: SpeakerItem) {
    const id = speaker.descUrl.split('/').pop()
    if (this.fetchedIds.indexOf(id) < 0) {
      this.fetchedIds.push(id)
      try {
        this.speakersService.getSpeakerDesc(speaker.descUrl).subscribe((response: any) => {
          speaker.desc = response
        })
      } catch (error) {
      }
    }
  }

  onClick(speaker: SpeakerItem) {
    const id = speaker.descUrl.split('/').pop()
    if (this.fetchedSessions.indexOf(id) < 0) {
      this.fetchedSessions.push(id)
      try {
        this.speakersService.getSpeakerSession(speaker.sessionUrl).subscribe((response: SessionItem[]) => {
          speaker.sessions = response
        })
      } catch (error) {
      }
    }
  }

}



