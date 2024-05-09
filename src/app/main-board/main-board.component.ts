import { Component, OnInit } from '@angular/core';
import { BoardHeaderComponent } from "./board-header/board-header.component";
import { WorkspaceMenuComponent } from './workspace-menu/workspace-menu.component';
import { ChannelChatWindowComponent } from './channel-chat-window/channel-chat-window.component';
import { ThreadWindowComponent } from './thread-window/thread-window.component';
import { WorkspaceMenuTogglebarComponent } from './workspace-menu-togglebar/workspace-menu-togglebar.component';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { MessageChatWindowComponent } from './message-chat-window/message-chat-window.component';
import { NewMessageComponent } from './new-message/new-message.component';
import { EmojiService } from '../../services/emoji.service';
import { ChatService } from '../../services/chat.service';
import { ChannelService } from '../../services/channel.service';
import { GoogleAuthProvider, getRedirectResult } from '@angular/fire/auth';
import { FirestoreServiceService } from '../../services/firestore-service.service';
@Component({
    selector: 'app-main-board',
    standalone: true,
    templateUrl: './main-board.component.html',
    styleUrl: './main-board.component.scss',
    imports: [BoardHeaderComponent, WorkspaceMenuComponent,
        ChannelChatWindowComponent, ThreadWindowComponent,
        WorkspaceMenuTogglebarComponent, RouterLink, CommonModule, MessageChatWindowComponent, NewMessageComponent]
})
export class MainBoardComponent implements OnInit {
    constructor(
        public emojiService: EmojiService,
        public authService: AuthenticationService,
        public chatService: ChatService,
        private channelService: ChannelService,
        private fireService: FirestoreServiceService
    ) { }
    async ngOnInit(): Promise<void> {
        this.chatService.getAllChats()
        await this.getGoogleLoginResult()
    }

    /**
   * Closes the emoji field by invoking a method from the emoji service.
    */
    closeEmojiField() {
        this.emojiService.closeEmojiField();
    }


    async getGoogleLoginResult() {
        if (this.authService.auth.currentUser?.providerData[0].providerId === 'google.com') {
            try {
                await getRedirectResult(this.authService.auth)
                    .then((result) => {
                        // This gives you a Google Access Token. You can use it to access Google APIs.
                        const user = result ? result.user : this.authService.currentUser;
                        this.authService.currentUser = user
                    })
                this.addGoogleUser()
            } catch (error) {
            }
        }
    }


    async addGoogleUser() {
        if (this.userExist()) {
            this.authService.setOnlineStatus(true)

        } else {
            await this.createGoogleUser()
            await this.channelService.addDefaultChannels()
        }
        this.setGoogleUser()
    }


    async createGoogleUser() {
        let userId = await this.fireService.addUser()
        let user = this.fireService.getUser(userId)
        let userJSON = this.createUserJson()
        await this.fireService.updateUser(user, userJSON)
    }


    createUserJson() {
        return {
            mail: this.authService.auth.currentUser?.email,
            name: this.authService.auth.currentUser?.displayName,
            profileImg: this.authService.auth.currentUser?.photoURL,
            online: true
        }
    }


    userExist() {
        let user = this.authService.getUSerByEmail(this.authService.currentUser.email)
        if (user) {
            return true
        } else return false
    }


    setGoogleUser() {
        this.fireService.subUserID(this.authService.auth.currentUser?.email!, this.authService.auth.currentUser?.photoURL!);
        this.authService.currentUser = this.authService.auth.currentUser
    }

    closePicker(){
            this.chatService.openChat.showEmojiPicker = false;
            this.chatService.emojiPickerIsOpen = false;
    }

}


