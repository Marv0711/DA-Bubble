import { Component, inject, HostListener, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DialogBoarderHeaderComponent } from '../dialog-boarder-header/dialog-boarder-header.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { LogoComponent } from "../../logo/logo.component";
import { CommonModule } from '@angular/common';
import { OpenChatWindowResponsiveService } from '../../open-chat-window-responsive.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChannelService } from '../../../services/channel.service';
import { ThreadService } from '../../../services/thread.service';
import { DialogProfileViewComponent } from '../dialog-profile-view/dialog-profile-view.component';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-board-header',
  standalone: true,
  templateUrl: './board-header.component.html',
  styleUrl: './board-header.component.scss',
  imports: [LogoComponent, MatIconModule, MatDialogModule, CommonModule, FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe]
})
export class BoardHeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, public authentication: AuthenticationService, public firestore: FirestoreServiceService, public chatService: ChatService, public channelService: ChannelService, public threadService: ThreadService) {
    this.firestore.currentUser = this.authentication.currentUser
    this.currentUserPic = ''
  }
  ResponsiveService = inject(OpenChatWindowResponsiveService);
  chatOpenAndWithUnder1200px: boolean = false;
  currentUserPic: string
  openList: boolean = false;
  lookingFor: string = '';

  ngOnInit(): void {
    this.currentUserPic = this.authentication.auth.currentUser?.photoURL || 'assets/img/avatars/male1.png'

  }

  showChannel(id:string){
    this.chatService.subChatList(id)
  }

  getChannelInformation(id:string){
    let index = this.channelService.channelList.findIndex((obj: any) => obj.id === id);
    if (index !== -1) {
      const obj = this.channelService.channelList[index];
      this.channelService.getUsersImages(obj.users);
      this.channelService.getUsersCounter(obj.id);
      this.channelService.getChannelName(obj.name);
      this.channelService.getDescription(obj.description);
      this.channelService.getUserName(obj.users);
    }
  }

  openThreadChat(chatId: string, chatText: string, chatloginName: string, chatTime: string, usermail: string, userImg: string, chatImage: string) {
    let threat = document.getElementById('app-thread-window');
    let channelChatWindow = document.getElementById('app-channel-chat-window');
    let workspaceMenu = document.getElementById('app-workspace-menu');
    if(threat){
      threat.style.display = 'flex';
      threat.classList.remove('d-none');
    }
    this.ResponsiveService.threadIsOpen = true
    this.threadService.threadChatText = chatText;
    this.threadService.threadChatloginName = chatloginName;
    this.threadService.threadChatTime = chatTime;
    this.threadService.threadUserMail = usermail;
    this.threadService.threadUserImg = userImg;
    this.threadService.threadChatImage = chatImage

    if(window.innerWidth < 1300 && channelChatWindow && workspaceMenu){
      channelChatWindow.style.display = 'none';
      workspaceMenu.style.display = 'none';
      this.ResponsiveService.threadOpenAndWithUnder1300px = true;
    }
  }

  showProfil(name:string, mail:string, img:string){
    this.firestore.loginName = name;
    this.firestore.userMail = mail;
    this.firestore.userImage = img;
    const onlinestatus = this.authentication.getUserOnlineStatus(mail)
    this.firestore.userOnlineStatus = onlinestatus!
    setTimeout(() => {
      this.openProfileViewDialog();
    }, 200);
  }

  openProfileViewDialog(){
    this.dialog.open(DialogProfileViewComponent, {
      panelClass: 'profile-view-dialog-responsive',
    });
  }

  openDialog() {
    this.dialog.open(DialogBoarderHeaderComponent, {
      position: {
        top: '95px',
        right: '40px',
      },
      panelClass: ['custom-container', 'profile-dialog-responsive']

    });
  }

  /**
* Closes channel-related windows or components and adjusts responsive flags.
*/
  closeChannel() {
    let threat = document.getElementById('app-thread-window');
    let workspaceMenu = document.getElementById('app-workspace-menu');
    let channelChatWindow = document.getElementById('app-channel-chat-window');
    let messageChatWindow = document.getElementById('app-message-chat-window');
    let newMessageWindow = document.getElementById('app-new-message');
    this.ResponsiveService.chatOpenAndWithUnder1300px = false;
    this.ResponsiveService.directMessageOpenAndWithUnder1300px = false;
    this.ResponsiveService.newMessageOpenAndWithUnder1300px = false;
    this.ResponsiveService.threadOpenAndWithUnder1300px = false;

    if (workspaceMenu && channelChatWindow && messageChatWindow && newMessageWindow && threat) {
      workspaceMenu.style.display = 'flex';
      channelChatWindow.style.display = 'none';
      messageChatWindow.style.display = 'none';
      newMessageWindow.style.display = 'none';
      threat.style.display = 'none'
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let workspaceMenu = document.getElementById('app-workspace-menu');
    let channelChatWindow = document.getElementById('app-channel-chat-window');
    let messageChatWindow = document.getElementById('app-message-chat-window');
    let newMessageWindow = document.getElementById('app-new-message');
    let threat = document.getElementById('app-thread-window');
    this.threadIsOpenandWindowIsChangeToBrowserView();
    this.channelChatWindowIsOpenandWindowIsChangeToBrowserView();
    this.messageChatWindowIsOpenandWindowIsChangeToBrowserView();
    this.newMessageWindowIsOpenandWindowIsChangeToBrowserView()
    this.showChannelChatInDesktopView(workspaceMenu, channelChatWindow, messageChatWindow, newMessageWindow, threat);
    this.showThreatInDesktopView(workspaceMenu, channelChatWindow, messageChatWindow, newMessageWindow, threat);
    this.showMessageChatInDesktopView(workspaceMenu, channelChatWindow, messageChatWindow, newMessageWindow, threat);
    this.showNewMessageChatInDesktopView(workspaceMenu, channelChatWindow, messageChatWindow, newMessageWindow, threat);
    this.channelChatWindowIsOpenandWindowIsChangeToMobileView(workspaceMenu, channelChatWindow);
    this.messageChatWindowIsOpenandWindowIsChangeToMobileView(workspaceMenu, messageChatWindow);
    this.newMessageChatWindowIsOpenandWindowIsChangeToMobileView(workspaceMenu, newMessageWindow);
    this.threatIsOpenandWindowIsChangeToMobileView(workspaceMenu, threat);
  }

  threadIsOpenandWindowIsChangeToBrowserView() {
    if (window.innerWidth > 1300 && this.ResponsiveService.threadOpenAndWithUnder1300px ){
      this.ResponsiveService.threadOpenAndWithUnder1300px = false;
    }
  }

  channelChatWindowIsOpenandWindowIsChangeToBrowserView() {
    if (window.innerWidth > 1300 && this.ResponsiveService.chatOpenAndWithUnder1300px) {
      this.ResponsiveService.chatOpenAndWithUnder1300px = false;
    }
  }

  messageChatWindowIsOpenandWindowIsChangeToBrowserView() {
    if (window.innerWidth > 1300 && this.ResponsiveService.directMessageOpenAndWithUnder1300px) {
      this.ResponsiveService.directMessageOpenAndWithUnder1300px = false;
    }
  }

  newMessageWindowIsOpenandWindowIsChangeToBrowserView() {
    if (window.innerWidth > 1300 && this.ResponsiveService.newMessageOpenAndWithUnder1300px) {
      this.ResponsiveService.newMessageOpenAndWithUnder1300px = false;
    }
  }

  showChannelChatInDesktopView(workspaceMenu: any, channelChatWindow: any, messageChatWindow: any, newMessageWindow: any, threat: any) {
    if (workspaceMenu && channelChatWindow && window.innerWidth > 1300 && !this.ResponsiveService.directMessagesOpen && !this.ResponsiveService.newMessagesOpen && messageChatWindow) {
      workspaceMenu.style.display = 'flex';
      channelChatWindow.style.display = 'flex';
      messageChatWindow.style.display = 'none';
      newMessageWindow.style.display = 'none';
      threat.style.display = 'none';
    }
  }

  showThreatInDesktopView(workspaceMenu: any, channelChatWindow: any, messageChatWindow: any, newMessageWindow: any, threat: any) {
    if (workspaceMenu && channelChatWindow && window.innerWidth > 1300 && !this.ResponsiveService.directMessagesOpen && !this.ResponsiveService.newMessagesOpen && this.ResponsiveService.threadIsOpen && messageChatWindow) {
      workspaceMenu.style.display = 'flex';
      channelChatWindow.style.display = 'flex';
      messageChatWindow.style.display = 'none';
      newMessageWindow.style.display = 'none';
      threat.style.display = 'flex';
    }
  }

  showMessageChatInDesktopView(workspaceMenu: any, channelChatWindow: any, messageChatWindow: any, newMessageWindow: any, threat: any) {
    if (workspaceMenu && channelChatWindow && window.innerWidth > 1300 && this.ResponsiveService.directMessagesOpen && !this.ResponsiveService.threadIsOpen && messageChatWindow) {
      workspaceMenu.style.display = 'flex';
      channelChatWindow.style.display = 'none';
      messageChatWindow.style.display = 'flex';
      newMessageWindow.style.display = 'none';
      threat.style.display = 'none';
    }
  }

  showNewMessageChatInDesktopView(workspaceMenu: any, channelChatWindow: any, messageChatWindow: any, newMessageWindow: any, threat: any) {
    if (workspaceMenu && channelChatWindow && window.innerWidth > 1300 && this.ResponsiveService.newMessageOpenAndWithUnder1300px && messageChatWindow && !this.ResponsiveService.threadIsOpen) {
      workspaceMenu.style.display = 'flex';
      channelChatWindow.style.display = 'none';
      messageChatWindow.style.display = 'none';
      newMessageWindow.style.display = 'flex';
      threat.style.display = 'none';
    }
  }

  threatIsOpenandWindowIsChangeToMobileView(workspaceMenu: any, threat: any,) {
    if (window.innerWidth < 1300 && !this.ResponsiveService.threadOpenAndWithUnder1300px) {
      if (threat && workspaceMenu) {
        threat.style.display = 'none';
        workspaceMenu.classList.remove('d-none')
      }
    }
  }

  channelChatWindowIsOpenandWindowIsChangeToMobileView(workspaceMenu: any, channelChatWindow: any,) {
    if (window.innerWidth < 1300 && !this.ResponsiveService.chatOpenAndWithUnder1300px) {
      if (channelChatWindow && workspaceMenu) {
        channelChatWindow.style.display = 'none';
        workspaceMenu.classList.remove('d-none')
      }
    }
  }

  messageChatWindowIsOpenandWindowIsChangeToMobileView(workspaceMenu: any, messageChatWindow: any) {
    if (window.innerWidth < 1300 && !this.ResponsiveService.directMessageOpenAndWithUnder1300px) {
      if (messageChatWindow && workspaceMenu) {
        messageChatWindow.style.display = 'none';
        workspaceMenu.classList.remove('d-none')
      }
    }
  }

  newMessageChatWindowIsOpenandWindowIsChangeToMobileView(workspaceMenu: any, newMessageWindow: any) {
    if (window.innerWidth < 1300 && !this.ResponsiveService.newMessageOpenAndWithUnder1300px) {
      if (newMessageWindow && workspaceMenu) {
        newMessageWindow.style.display = 'none';
        workspaceMenu.classList.remove('d-none')
      }
    }
  }

  closeDropDown(){
    let searchInput = document.getElementById('search-input') as HTMLInputElement;
    if(searchInput){
      searchInput.value = '';
      this.lookingFor = '';
    }
  }
}

