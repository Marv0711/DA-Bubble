import { ChangeDetectorRef, Component, DebugElement, Inject, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OpenChatWindowResponsiveService } from '../../open-chat-window-responsive.service';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { CommonModule } from '@angular/common';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';
import { MatDialog } from '@angular/material/dialog';
import { ChatService } from '../../../services/chat.service';
import { ChannelService } from '../../../services/channel.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { SpecialListService } from '../../special-list.service';
import { BoardHeaderComponent } from '../board-header/board-header.component';
import { ThreadService } from '../../../services/thread.service';
import { DialogBoarderHeaderComponent } from '../dialog-boarder-header/dialog-boarder-header.component';
import { DialogProfileViewComponent } from '../dialog-profile-view/dialog-profile-view.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-workspace-menu',
  standalone: true,
  imports: [MatIconModule, CommonModule, DialogCreateChannelComponent, BoardHeaderComponent, FormsModule],
  templateUrl: './workspace-menu.component.html',
  styleUrl: './workspace-menu.component.scss'
})
export class WorkspaceMenuComponent {

  lookingFor: string = '';

  constructor(public dialog: MatDialog,
    public firestoreService: FirestoreServiceService,
    public chatService: ChatService,
    public channelService: ChannelService,
    public authService: AuthenticationService,
    public list: SpecialListService,
    public authentication: AuthenticationService,
    public threadService: ThreadService) {
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

  ngOnInit() {
    this.firestoreService.subAllUser();
    this.channelService.subChannelList()
  }

  loadlist(){
    this.firestoreService.subAllUser();
    this.list.userlist = this.firestoreService.allUserList
  }

  ngOnDestroy(): void {
    this.channelService.unsubchannel

  }

  showProfil(name:string, mail:string, img:string){
    this.firestoreService.loginName = name;
    this.firestoreService.userMail = mail;
    this.firestoreService.userImage = img;
    const onlinestatus = this.authentication.getUserOnlineStatus(mail)
    this.firestoreService.userOnlineStatus = onlinestatus!
    setTimeout(() => {
      this.openProfileViewDialog();
    }, 200);
  }

  openProfileViewDialog(){
    this.dialog.open(DialogProfileViewComponent, {
      panelClass: 'profile-view-dialog-responsive',
    });
  }

  ResponsiveService = inject(OpenChatWindowResponsiveService);
  showChannels = true;
  showContacts = true;

  /**
 * Opens a dialog to create a new channel.
 */
  openCreateChannel() {
    this.channelService.allChannels();
    this.dialog.open(DialogCreateChannelComponent, {
      panelClass: 'create-channel-responsive'
    })
  }

  /**
 * Toggles the visibility of the channel area.
 */
  toggleChannels() {
    if (this.showChannels) {
      this.hideChannelArea();
    } else {
      this.showChannelArea();
    }
  }

  /**
 * Hides the channel area by adding the 'd-none' class and updating related flags.
 */
  hideChannelArea() {
    document.getElementById('content-channels')?.classList.add('d-none');
    document.getElementById('drop-down-channels')?.classList.add('rotate270');
    this.showChannels = false;
  }

  /**
 * Displays the channel area by removing the 'd-none' class.
 */
  showChannelArea() {
    document.getElementById('content-channels')?.classList.remove('d-none');
    document.getElementById('drop-down-channels')?.classList.remove('rotate270');
  }

  /**
 * Toggles the visibility of the contact area.
 */
  toggleContacts() {
    if (this.showContacts) {
      this.hideContactArea()
    } else {
      this.showContactArea()
    }
  }

  /**
 * Hides the contact area by adding the 'd-none' class and updating related flags.
 */
  hideContactArea() {
    document.getElementById('content-contacts')?.classList.add('d-none');
    document.getElementById('drop-down-contacts')?.classList.add('rotate270');
    this.showContacts = false;
  }

  /**
 * Displays the contact area by removing the 'd-none' class and updating related flags.
 */
  showContactArea() {
    document.getElementById('content-contacts')?.classList.remove('d-none');
    document.getElementById('drop-down-contacts')?.classList.remove('rotate270');
    this.showContacts = true;
  }

  /**
 * Shows the channel chat window and hides other chat-related elements.
 * 
 * @param {string} id - The ID of the channel to display.
 */
  showChannel(id: string) {
    let workspaceMenu = document.getElementById('app-workspace-menu');
    let channelChatWindow = document.getElementById('app-channel-chat-window');
    let messageChatWindow = document.getElementById('app-message-chat-window');
    let newMessageWindow = document.getElementById('app-new-message');
    let threat = document.getElementById('app-thread-window');
    this.chatService.subChatList(id)
    this.showChannels = true;
    this.scrollToBottomofChat();
    setTimeout(() => {
      document.getElementById('message-field-channel')?.focus();
    }, 200);
    

    if (channelChatWindow && messageChatWindow && newMessageWindow && threat) {
      channelChatWindow.style.display = 'flex';
      messageChatWindow.style.display = 'none';
      newMessageWindow.style.display = 'none';
      threat.style.display = 'none';
      this.ResponsiveService.directMessagesOpen = false;
      this.showMobileChannelChat(workspaceMenu, threat);
    }
  }

  /**
 * Hides the workspace menu if the window width is less than 1300 pixels.
 * 
 * @param {any} workspaceMenu - Reference to the workspace menu element.
 */
  showMobileChannelChat(workspaceMenu: any, threat: any) {
    if (window.innerWidth < 1300 && workspaceMenu && threat) {
      workspaceMenu.style.display = 'none';
      this.ResponsiveService.chatOpenAndWithUnder1300px = true;
      threat.style.display = 'none';
    }
  }

  /**
 * Scrolls to the bottom of the chat container.
 */
  scrollToBottomofChat() {
    setTimeout(() => {
      document.getElementById('chat-container')?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  }

  /**
 * Retrieves the list of channels.
 * 
 * @returns {Array} The list of channels.
 */
  getChannels(): Array<any> {
    return this.channelService.channelList
  }

  /**
 * Shows the message chat window and hides other chat-related elements.
 */
  showChat() {
    let workspaceMenu = document.getElementById('app-workspace-menu');
    let channelChatWindow = document.getElementById('app-channel-chat-window');
    let messageChatWindow = document.getElementById('app-message-chat-window');
    let newMessageWindow = document.getElementById('app-new-message');
    let threat = document.getElementById('app-thread-window');
    setTimeout(() => {
      document.getElementById('message-field-message')?.focus();
    }, 200);

    if (channelChatWindow && messageChatWindow && newMessageWindow && threat) {
      this.ResponsiveService.directMessagesOpen = true;
      channelChatWindow.style.display = 'none';
      messageChatWindow.style.display = 'flex';
      newMessageWindow.style.display = 'none';
      threat.style.display = 'none';
      this.showMobileMessageChat(workspaceMenu);
    }
  }

  /**
 * Hides the workspace menu if the window width is less than 1300 pixels.
 * 
 * @param {any} workspaceMenu - Reference to the workspace menu element.
 */
  showMobileMessageChat(workspaceMenu: any) {
    if (window.innerWidth < 1300 && workspaceMenu) {
      workspaceMenu.style.display = 'none';
      this.ResponsiveService.directMessageOpenAndWithUnder1300px = true;
    }
  }

  /**
 * Shows the new message window and hides other chat-related elements.
 */
  showNewMessage() {
    let workspaceMenu = document.getElementById('app-workspace-menu');
    let channelChatWindow = document.getElementById('app-channel-chat-window');
    let messageChatWindow = document.getElementById('app-message-chat-window');
    let newMessageWindow = document.getElementById('app-new-message');

    if (channelChatWindow && messageChatWindow && newMessageWindow) {
      this.ResponsiveService.newMessagesOpen = true;
      channelChatWindow.style.display = 'none';
      messageChatWindow.style.display = 'none';
      newMessageWindow.style.display = 'flex';
      this.showMobileNewMessage(workspaceMenu);
    }
  }

  /**
 * Hides the workspace menu if the window width is less than 1300 pixels.
 * 
 * @param {any} workspaceMenu - Reference to the workspace menu element.
 */
  showMobileNewMessage(workspaceMenu: any) {
    if (window.innerWidth < 1300 && workspaceMenu) {
      workspaceMenu.style.display = 'none';
      this.ResponsiveService.newMessageOpenAndWithUnder1300px = true;
    }
  }

  closeDropDown(){
    let searchInput = document.getElementById('search-input-responsive') as HTMLInputElement;
    if(searchInput){
      searchInput.value = '';
      this.lookingFor = '';
    }
  }


}
