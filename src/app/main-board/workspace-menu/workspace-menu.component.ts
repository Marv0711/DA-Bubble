import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OpenChatWindowResponsiveService } from '../../open-chat-window-responsive.service';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { CommonModule } from '@angular/common';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';
import { MatDialog } from '@angular/material/dialog';
import { ChatService } from '../../../services/chat.service';
import { ChannelService } from '../../../services/channel.service';

@Component({
  selector: 'app-workspace-menu',
  standalone: true,
  imports: [MatIconModule, CommonModule, DialogCreateChannelComponent],
  templateUrl: './workspace-menu.component.html',
  styleUrl: './workspace-menu.component.scss'
})
export class WorkspaceMenuComponent {

  constructor(public dialog: MatDialog, 
    public firestoreService: FirestoreServiceService,
    public chatService: ChatService,
    public channelService: ChannelService) {
  }

  ngOnInit() {
    this.firestoreService.subAllUser();
  }


  ResponsiveService = inject(OpenChatWindowResponsiveService);
  showChannels = true;
  showContacts = true;

  /**
 * Opens a dialog to create a new channel.
 */
  openCreateChannel() {
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
    this.chatService.subChatList(id)
    this.showChannels = true;
    this.scrollToBottomofChat();
    if (channelChatWindow && messageChatWindow && newMessageWindow) {
      channelChatWindow.style.display = 'flex';
      messageChatWindow.style.display = 'none';
      newMessageWindow.style.display = 'none';
      this.ResponsiveService.directMessagesOpen = false;
      this.showMobileChannelChat(workspaceMenu);
    }
  }

  /**
 * Hides the workspace menu if the window width is less than 1300 pixels.
 * 
 * @param {any} workspaceMenu - Reference to the workspace menu element.
 */
  showMobileChannelChat(workspaceMenu: any) {
    if (window.innerWidth < 1300 && workspaceMenu) {
      workspaceMenu.style.display = 'none';
      this.ResponsiveService.chatOpenAndWithUnder1300px = true;
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
  getChannels() {
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

    if (channelChatWindow && messageChatWindow && newMessageWindow) {
      this.ResponsiveService.directMessagesOpen = true;
      channelChatWindow.style.display = 'none';
      messageChatWindow.style.display = 'flex';
      newMessageWindow.style.display = 'none';
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


}
