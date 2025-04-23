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

import { AppMetadata } from "./AppMetadata";

/**
 * App is a type that represents an app which contains a url toteh guest application and metadata.
 */
export type App = {
  metadata: AppMetadata;
  url: string;
};

/**
 * Toggle is a type that represents a toggle which contains a metadata and a function to be called when the toggle is clicked.
 * In most cases the toggle will be used to open a dialog or a panel which is of an App type.
 */
export type Toggle = {
  metadata: AppMetadata;
  onClick: () => void;
};
