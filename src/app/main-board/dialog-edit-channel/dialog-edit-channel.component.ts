import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-channel',
  standalone: true,
  imports: [],
  templateUrl: './dialog-edit-channel.component.html',
  styleUrl: './dialog-edit-channel.component.scss'
})
export class DialogEditChannelComponent {

  constructor(public dialogRef: MatDialogRef<DialogEditChannelComponent>) {}

  closeEditWindowChannel() {
    this.dialogRef.close();
  }
  
  leftEditWindowChannel() {
    this.closeEditWindowChannel();
  }

  editChannelName() {
   this.transformChannelNameAndSave();
    document.getElementById('edit')?.classList.add('d-none');
    document.getElementById('save')?.classList.remove('d-none');
    document.getElementById('nameOfChannel')?.classList.add('d-none');
    document.getElementById('inputChannelName')?.classList.remove('d-none');
    document.getElementById('channelBorder')?.classList.remove('border');
  }

  transformChannelNameAndSave() {
    const channelAndSave = document.getElementById('save');
    const channelName = document.getElementById('channelName');
    if (channelAndSave && channelName) {
      channelName.style.transition = "transform 0.1s ease";
      channelName.style.transform = "translateY(-20px)";
      channelAndSave.style.transition = "transform 5.0s ease";
      channelAndSave.style.transform = "translateY(-20px)";
    }

  }
}
