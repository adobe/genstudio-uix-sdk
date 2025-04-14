/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { Asset } from "../asset/Asset";

export class ExtensionRegistrationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ExtensionRegistrationError";
  }
}

/**
 * Manages extension registration
 */
export class ExtensionRegistrationService {
  // useage
  /**
     * open the create add on bar
     * @param guestConnection - the guest connection
     * @param appExtensionId - the app extension id
     * 
     * example:
            const ExtensionRegistration = (): React.JSX.Element => {
                const init = async (): Promise<void> => {
                const guestConnection = await register({
                    id: extensionId,
                    methods: {
                    createAddOnBar: {
                        addToggle: async (appExtensionId: string): Promise<ToggleItem[]> => {
                        return [
                            {
                            appMetaData: getAppMetadata(appExtensionId),
                            onClick: async () => {
                                await openCreateAddOnBar(guestConnection, appExtensionId);
                            },
                            }]
                        }
                    }
                    }
                }
                return <ExtensionRegistration />
            }
     */

  //************************************
  // Create Add On Bar (Right Panel)
  //************************************

  static openCreateAddOnBar(guestConnection: any, appExtensionId: string) {
    // support only old api for now
    return guestConnection.host.api.dialogs.open(`${appExtensionId}`);
    // return guestConnection.host.api.createAddOnBar.openDialog(`${appExtensionId}`);
  }

  //************************************
  // Create Add Context Addon Dialog
  //************************************

  /**
   * open the add context add on bar
   * @param guestConnection - the guest connection
   * @param appExtensionId - the app extension id
   */
  static openAddContextAddOnBar(guestConnection: any, appExtensionId: string) {
    // support only old api for now
    return guestConnection.host.api.dialogs_context.open(`${appExtensionId}`);
    // return guestConnection.host.api.createContextAddOns.openDialog(`${appExtensionId}`);
  }

  /**
   * close the add context add on dialog
   * @param guestConnection - the guest connection
   */
  static closeAddContextAddOnBar(guestConnection: any) {
    // support only old api for now
    return guestConnection.host.api.dialogs_context.close();
    // return guestConnection.host.api.createContextAddOns.closeDialog();
  }

  //************************************
  // Content Select Content Add Ons
  //************************************

  /**
   * open the content select content add ons dialog
   * @param guestConnection - the guest connection
   * @param appExtensionId - the app extension id
   * @returns the selected assets and the total count of left assets
   */
  static openSelectContentDialog(
    guestConnection: any,
    appExtensionId: string,
  ): Promise<{ Assets: Asset[]; remainingSelectionCount: number }> {
    return guestConnection.host.api.contentSelectContentAddOns.openDialog(
      appExtensionId,
    );
  }

  /**
   * set the selected assets
   * @param guestConnection - the guest connection
   * @param assets - the selected assets
   * @param extensionId - the extension id of the content select content add ons, this id will be used to identify the content select content add ons
   */
  static setSelectContentSelectedAssets(
    guestConnection: any,
    assets: Asset[],
    extensionId: string,
  ) {
    return guestConnection.host.api.contentSelectContentDialog.setSelectedAssets(
      assets,
      extensionId,
    );
  }
}
