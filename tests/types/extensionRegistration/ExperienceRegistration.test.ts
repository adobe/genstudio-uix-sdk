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

import { ExtensionRegistrationService, ExtensionRegistrationError } from "../../../src/types/extensionRegistration/ExtenstionRegistration";

describe('ExtensionRegistrationService', () => {
    const mockAppExtensionId = 'test-extension-id';

    describe('openCreateAddOnBar', () => {
      it('should use old API if only one available', async () => {
        const mockGuestConnection = {
          host: {
            api: {
              dialogs: {
                open: jest.fn().mockResolvedValue(undefined)
              }
            }
          }
        };
  
        await ExtensionRegistrationService.openCreateAddOnBar(mockGuestConnection, mockAppExtensionId);
        
        expect(mockGuestConnection.host.api.dialogs.open)
          .toHaveBeenCalledWith(mockAppExtensionId);
      });
      it('should use new API if both APIs are available', async () => {
        const mockGuestConnection = {
          host: {
            api: {
              createAddOnBar: {
                openDialog: jest.fn().mockResolvedValue(undefined)
              },
              dialogs: {
                open: jest.fn().mockResolvedValue(undefined)
              }
            }
          }
        };
  
        await ExtensionRegistrationService.openCreateAddOnBar(mockGuestConnection, mockAppExtensionId);
        
        expect(mockGuestConnection.host.api.createAddOnBar.openDialog)
          .toHaveBeenCalledWith(mockAppExtensionId);
      });
      it('should throw an error if no API is available', async () => {
        const mockGuestConnection = {
          host: {
            api: {}
          }
        };  
        try {
            await ExtensionRegistrationService.openCreateAddOnBar(mockGuestConnection, mockAppExtensionId);
            fail('Expected an error to be thrown');
        } catch (error) {
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(ExtensionRegistrationError);
        }
      });
    });

    describe('openAddContextAddOnBar', () => {
        it('should use old API if only one available', async () => {
            const mockGuestConnection = {
                host: {
                    api: {
                        dialogs_context: {  
                            open: jest.fn().mockResolvedValue(undefined)
                        }
                    }
                }
            };
            await ExtensionRegistrationService.openAddContextAddOnBar(mockGuestConnection, mockAppExtensionId); 
            
            expect(mockGuestConnection.host.api.dialogs_context.open)
                .toHaveBeenCalledWith(mockAppExtensionId);
        });
        it('should use new API if both APIs are available', async () => {
            const mockGuestConnection = {
                host: {
                    api: {
                        createContextAddOns: {
                            openDialog: jest.fn().mockResolvedValue(undefined)
                        },
                        dialogs: {
                            open: jest.fn().mockResolvedValue(undefined)  
                        }
                    }
                }
            };
            await ExtensionRegistrationService.openAddContextAddOnBar(mockGuestConnection, mockAppExtensionId); 
            
            expect(mockGuestConnection.host.api.createContextAddOns.openDialog)
                .toHaveBeenCalledWith(mockAppExtensionId);
        });
        it('should throw an error if no API is available', async () => {
            const mockGuestConnection = {
                host: {
                    api: {}
                }
            };
            try {
                await ExtensionRegistrationService.openAddContextAddOnBar(mockGuestConnection, mockAppExtensionId);
                fail('Expected an error to be thrown'); 
            } catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(ExtensionRegistrationError);
            }
        });
    });
});
