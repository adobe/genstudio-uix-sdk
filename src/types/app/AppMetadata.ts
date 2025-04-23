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

/* this file defines types and interfaces that are considered as api for extension consumers */

import { Account } from "../account/Account";
import { Channel } from "../channel/Channel";
/** App Metadata */
export type AppMetadata = {
  id: string;
  extensionId: string; //deprecated
  iconDataUri: string;
  supportedChannels: Channel[];
  label: string;
  accounts?: Account[];
};

/**
 * @deprecated This type is deprecated. Please use AppMetadata instead.
 */
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type AppMetaData = AppMetadata; // NOSONAR
