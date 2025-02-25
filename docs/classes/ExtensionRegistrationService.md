[**@adobe/genstudio-uix-sdk**](../README.md)

***

[@adobe/genstudio-uix-sdk](../globals.md) / ExtensionRegistrationService

# Class: ExtensionRegistrationService

Manages extension registration

## Constructors

### new ExtensionRegistrationService()

> **new ExtensionRegistrationService**(): [`ExtensionRegistrationService`](ExtensionRegistrationService.md)

#### Returns

[`ExtensionRegistrationService`](ExtensionRegistrationService.md)

## Methods

### openAddContextAddOnBar()

> `static` **openAddContextAddOnBar**(`guestConnection`: `any`, `appExtensionId`: `string`): `any`

open the add context add on bar

#### Parameters

##### guestConnection

`any`

the guest connection

##### appExtensionId

`string`

the app extension id

#### Returns

`any`

***

### openCreateAddOnBar()

> `static` **openCreateAddOnBar**(`guestConnection`: `any`, `appExtensionId`: `string`): `any`

open the create add on bar

#### Parameters

##### guestConnection

`any`

the guest connection

##### appExtensionId

`string`

the app extension id

example:
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

#### Returns

`any`
