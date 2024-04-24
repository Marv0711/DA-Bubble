import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MessageFieldComponent } from '../message-field/message-field.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { CommonModule } from '@angular/common';
import { SpecialListService } from '../../special-list.service';
import { ChannelService } from '../../../services/channel.service';
import { ChatService } from '../../../services/chat.service';
import { PrivatMessageFieldComponent } from "../message-chat-window/privat-message-field/privat-message-field.component";

@Component({
    selector: 'app-new-message',
    standalone: true,
    templateUrl: './new-message.component.html',
    styleUrl: './new-message.component.scss',
    imports: [MessageFieldComponent,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        AsyncPipe, FormsModule, ReactiveFormsModule, CommonModule, PrivatMessageFieldComponent]
})
export class NewMessageComponent{

  myControl = new FormControl('');
  input: string = '';
  users: any = '';
  channels: any = '';
  userNames: any = ['test'];
  channelNames:any = ['test'];
  filteredOptions: Observable<string[]>;
  sendtoChannel:boolean = true;

  constructor(public userService: FirestoreServiceService, public list: SpecialListService, public channelservice: ChannelService, public chatService: ChatService) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    if(filterValue.includes('@')){
      return this.userNames.filter((option: any) => option.toLowerCase().includes(filterValue));
    }

    else if(filterValue.includes('#')){
      return this.channelNames.filter((option: any) => option.toLowerCase().includes(filterValue));
    }

    else{
      return [];
    }

    
  }

  test() {
    this.users = this.list.userlist;
    this.channels = this.channelservice.channelList

    this.userNames = this.users.map((item:any) => '@' + item.name);
    this.channelNames = this.channels.map((item:any) => '#' + item.name);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  setplacetosave(value:string){
    let i = this.channelNames.indexOf(value);
    
    if(i == -1){
      i = this.userNames.indexOf(value);
      let user = this.users[i];
      this.chatService.currentContactUser = user;
      this.sendtoChannel = false;
    }

    else{
      let id = this.channels[i].id;
      this.channelservice.channelID = id;
      this.sendtoChannel = true;
    }
  }

  /**
 * Prevents event propagation.
 * @param event The event object.
 */
  dontclose(event: Event) {
    event.stopPropagation();
  };
}
