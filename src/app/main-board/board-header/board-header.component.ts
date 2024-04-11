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
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

export interface StateGroup {
    letter: string;
    names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
    const filterValue = value.toLowerCase();

    return opt.filter(item => item.toLowerCase().includes(filterValue));
};

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

    stateForm = this._formBuilder.group({
        stateGroup: '',
    });

    constructor(public dialog: MatDialog, public authentication: AuthenticationService, public firestore: FirestoreServiceService, private _formBuilder: FormBuilder) {
        this.firestore.currentUser = this.authentication.currentUser
        this.currentUserPic = ''
        this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges.pipe(
            startWith(''),
            map(value => this._filterGroup(value || '')),
          );
    }
    ResponsiveService = inject(OpenChatWindowResponsiveService);
    chatOpenAndWithUnder1200px: boolean = false;
    currentUserPic: string

    ngOnInit(): void {
        this.currentUserPic = this.authentication.auth.currentUser?.photoURL || 'assets/img/avatars/male1.png'
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
        let workspaceMenu = document.getElementById('app-workspace-menu');
        let channelChatWindow = document.getElementById('app-channel-chat-window');
        let messageChatWindow = document.getElementById('app-message-chat-window');
        let newMessageWindow = document.getElementById('app-new-message');
        this.ResponsiveService.chatOpenAndWithUnder1300px = false;
        this.ResponsiveService.directMessageOpenAndWithUnder1300px = false;
        this.ResponsiveService.newMessageOpenAndWithUnder1300px = false;

        if (workspaceMenu && channelChatWindow && messageChatWindow && newMessageWindow) {
            workspaceMenu.style.display = 'flex';
            channelChatWindow.style.display = 'none';
            messageChatWindow.style.display = 'none';
            newMessageWindow.style.display = 'none'
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        let workspaceMenu = document.getElementById('app-workspace-menu');
        let channelChatWindow = document.getElementById('app-channel-chat-window');
        let messageChatWindow = document.getElementById('app-message-chat-window');
        let newMessageWindow = document.getElementById('app-new-message');
        this.channelChatWindowIsOpenandWindowIsChangeToBrowserView();
        this.messageChatWindowIsOpenandWindowIsChangeToBrowserView();
        this.newMessageWindowIsOpenandWindowIsChangeToBrowserView()
        this.showChannelChatInDesktopView(workspaceMenu, channelChatWindow, messageChatWindow, newMessageWindow);
        this.showMessageChatInDesktopView(workspaceMenu, channelChatWindow, messageChatWindow, newMessageWindow);
        this.showNewMessageChatInDesktopView(workspaceMenu, channelChatWindow, messageChatWindow, newMessageWindow);
        this.channelChatWindowIsOpenandWindowIsChangeToMobileView(workspaceMenu, channelChatWindow);
        this.messageChatWindowIsOpenandWindowIsChangeToMobileView(workspaceMenu, messageChatWindow);
        this.newMessageChatWindowIsOpenandWindowIsChangeToMobileView(workspaceMenu, newMessageWindow);
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

    showChannelChatInDesktopView(workspaceMenu: any, channelChatWindow: any, messageChatWindow: any, newMessageWindow: any) {
        if (workspaceMenu && channelChatWindow && window.innerWidth > 1300 && !this.ResponsiveService.directMessagesOpen && !this.ResponsiveService.newMessagesOpen && messageChatWindow) {
            workspaceMenu.style.display = 'flex';
            channelChatWindow.style.display = 'flex';
            messageChatWindow.style.display = 'none';
            newMessageWindow.style.display = 'none';
        }
    }

    showMessageChatInDesktopView(workspaceMenu: any, channelChatWindow: any, messageChatWindow: any, newMessageWindow: any) {
        if (workspaceMenu && channelChatWindow && window.innerWidth > 1300 && this.ResponsiveService.directMessagesOpen && messageChatWindow) {
            workspaceMenu.style.display = 'flex';
            channelChatWindow.style.display = 'none';
            messageChatWindow.style.display = 'flex';
            newMessageWindow.style.display = 'none';
        }
    }

    showNewMessageChatInDesktopView(workspaceMenu: any, channelChatWindow: any, messageChatWindow: any, newMessageWindow: any) {
        if (workspaceMenu && channelChatWindow && window.innerWidth > 1300 && this.ResponsiveService.newMessageOpenAndWithUnder1300px && messageChatWindow) {
            workspaceMenu.style.display = 'flex';
            channelChatWindow.style.display = 'none';
            messageChatWindow.style.display = 'none';
            newMessageWindow.style.display = 'flex';
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

    stateGroups: StateGroup[] = [
        {
          letter: 'A',
          names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas'],
        },
        {
          letter: 'C',
          names: ['California', 'Colorado', 'Connecticut'],
        },
        {
          letter: 'D',
          names: ['Delaware'],
        },
        {
          letter: 'F',
          names: ['Florida'],
        },
        {
          letter: 'G',
          names: ['Georgia'],
        },
        {
          letter: 'H',
          names: ['Hawaii'],
        },
        {
          letter: 'I',
          names: ['Idaho', 'Illinois', 'Indiana', 'Iowa'],
        },
        {
          letter: 'K',
          names: ['Kansas', 'Kentucky'],
        },
        {
          letter: 'L',
          names: ['Louisiana'],
        },
        {
          letter: 'M',
          names: [
            'Maine',
            'Maryland',
            'Massachusetts',
            'Michigan',
            'Minnesota',
            'Mississippi',
            'Missouri',
            'Montana',
          ],
        },
        {
          letter: 'N',
          names: [
            'Nebraska',
            'Nevada',
            'New Hampshire',
            'New Jersey',
            'New Mexico',
            'New York',
            'North Carolina',
            'North Dakota',
          ],
        },
        {
          letter: 'O',
          names: ['Ohio', 'Oklahoma', 'Oregon'],
        },
        {
          letter: 'P',
          names: ['Pennsylvania'],
        },
        {
          letter: 'R',
          names: ['Rhode Island'],
        },
        {
          letter: 'S',
          names: ['South Carolina', 'South Dakota'],
        },
        {
          letter: 'T',
          names: ['Tennessee', 'Texas'],
        },
        {
          letter: 'U',
          names: ['Utah'],
        },
        {
          letter: 'V',
          names: ['Vermont', 'Virginia'],
        },
        {
          letter: 'W',
          names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
        },
      ];
    
      stateGroupOptions: Observable<StateGroup[]>;

      private _filterGroup(value: string): StateGroup[] {
        if (value) {
          return this.stateGroups
            .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
            .filter(group => group.names.length > 0);
        }
    
        return this.stateGroups;
      }
}
