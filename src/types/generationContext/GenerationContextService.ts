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

import { GuestUI } from "@adobe/uix-guest";
import { VirtualApi } from "@adobe/uix-core";
import { AdditionalContext, AdditionalContextTypes, Claim } from "./GenerationContext";

export interface CreateApi extends VirtualApi {
  api: {
    create: {
      updateCustomPrompt: (
        extensionId: { id: string },
        contextType: AdditionalContextTypes,
        additionalContext: AdditionalContext<Claim>
      ) => Promise<void>;
    };
  };
}

export class GenerationContextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GenerationContextError";
  }
}

export class GenerationContextService {
  /**
   * Sets additional context on the prompt
   * @param connection - The guest connection to the host
   * @param extensionId - The extension id
   * @param contextType - The context type
   * @param additionalContext - The additional context
   * @returns void
   * @throws Error if connection is missing
   */
  static async setAdditionalContext(
    connection: GuestUI<CreateApi>,
    extension: { id: string },
    contextType: AdditionalContextTypes,
    additionalContext: AdditionalContext<Claim>
  ): Promise<void> {
    const validations: Array<[boolean, string]> = [
      [!connection, "Connection is required to set additional context"],
      [!extension?.id, "Invalid extension ID"],
      [!contextType, "Context type is required"],
      [!additionalContext?.additionalContextValues?.length, "Additional context values are required"],
      [
        !additionalContext?.additionalContextValues?.every(value => value.id && value.description),
        "Invalid context value format"
      ]
    ];
    const failedValidation = validations.find(([condition]) => condition);
    if (failedValidation) {
      throw new GenerationContextError(failedValidation[1]);
    }
    try {
      // @ts-ignore Remote API is handled through postMessage
      await connection.host.api.create.updateCustomPrompt(extension, contextType, additionalContext);
    } catch (error) {
      throw new GenerationContextError("Failed to set additional context");
    }
  }
}
