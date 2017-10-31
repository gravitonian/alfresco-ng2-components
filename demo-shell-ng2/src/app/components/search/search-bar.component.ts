/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MinimalNodeEntity } from 'alfresco-js-api';
import { AlfrescoAuthenticationService } from 'ng2-alfresco-core';

@Component({
    selector: 'search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

    @Input()
    expandable: boolean = true;

    @Output()
    expand = new EventEmitter();

    fileNodeId: string;
    fileShowed: boolean = false;
    searchTerm: string = '';
    subscriptAnimationState: string;

    constructor(public router: Router,
                public authService: AlfrescoAuthenticationService) {
    }

    isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    /**
     * Called when the user submits the search, e.g. hits enter or clicks submit
     *
     * @param event Parameters relating to the search
     */
    onSearchSubmit(event: KeyboardEvent) {
      let value = (event.target as HTMLInputElement).value;
      this.router.navigate(['/search', {
          q: value
      }]);
  }

  onItemClicked(event: MinimalNodeEntity) {
      if (event.entry.isFile) {
          this.fileNodeId = event.entry.id;
          this.fileShowed = true;
      } else if (event.entry.isFolder) {
          this.router.navigate(['/files', event.entry.id]);
      }
  }

}
