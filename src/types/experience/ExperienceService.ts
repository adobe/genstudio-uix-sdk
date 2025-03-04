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

import { Experience, ExperienceField } from "./Experience";

import { GuestUI } from "@adobe/uix-guest";
import { VirtualApi } from "@adobe/uix-core";
import { GenerationContext } from "../generationContext/GenerationContext";

export interface RightPanelApi extends VirtualApi {
  api: {
    createRightPanel: {
      getExperiences: () => Promise<any[]>;
      getGenerationContext: () => Promise<any>;
    };
  };
}

export class ExperienceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ExperienceError";
  }
}

/**
 * Manages experience data conversion and retrieval
 */
export class ExperienceService {
  /**
   * Fetches experiences from the connection
   * @param connection - The guest connection to the host
   * @returns Promise<Experience[]> Array of converted experiences
   * @throws Error if connection is missing
   */
  static async getExperiences(
    connection: GuestUI<RightPanelApi>,
  ): Promise<Experience[]> {
    if (!connection) {
      throw new ExperienceError("Connection is required to get experiences");
    }

    try {
      //TODO: getExperiences will change to return the actual Experiences object
      // should handle it here and deprecate the old one once released to production
      // @ts-ignore Remote API is handled through postMessage
      const experiences = await connection.host.api.createRightPanel.getExperiences();

      // check if experiences is already of type Experience[]
      if (
        experiences &&
        experiences.length > 0 &&
        typeof experiences[0] === "object" &&
        experiences[0]?.experienceFields &&
        experiences[0]?.id &&
        Object.keys(experiences[0]).length === 2
      ) {
        return experiences;
      }
      // otherwise convert the raw experiences to Experience[]
      return this.convertRawExperiencesToExperiences(experiences);
    } catch (error) {
      throw new ExperienceError("Failed to fetch experiences from host");
    }
  }

  /**
   * Converts a raw experience object to Experience format
   * @param rawExperience - Raw experience data from the host
   * @returns Experience - Converted Experience object
   */
  static convertRawExperienceToExperience(rawExperience: {
    id?: string;
    fields: { [key: string]: any };
  }): Experience {
    const experienceFields: Record<string, ExperienceField> = {};

    Object.entries(rawExperience.fields).forEach(([key, value]) => {
      let fieldValue = "";
      if (value !== null && value !== undefined) {
        fieldValue =
          typeof value === "object" ? JSON.stringify(value) : String(value);
      }
      experienceFields[key] = {
        fieldName: key,
        fieldValue,
      };
    });

    return {
      id: rawExperience.id ?? "",
      experienceFields,
    };
  }

  /**
   * Converts an array of raw experiences to Experience format
   * @param rawExperiences - Array of raw experience data
   * @returns Experience[] - Array of converted Experience objects
   */
  static convertRawExperiencesToExperiences(
    rawExperiences: any[],
  ): Experience[] {
    return rawExperiences.map(exp =>
      this.convertRawExperienceToExperience(exp),
    );
  }

  static async getGenerationContext(
    connection: GuestUI<RightPanelApi>
  ): Promise<GenerationContext> {
    if (!connection) {
      throw new ExperienceError("Connection is required to get generation context");
    }
    try {
      // @ts-ignore Remote API is handled through postMessage
      return await connection.host.api.createRightPanel.getGenerationContext();
    } catch (error) {
      throw new ExperienceError("Failed to get generation context");
    }
  }
}
