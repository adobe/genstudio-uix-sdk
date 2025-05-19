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

### closeAddContextAddOnBar()

> `static` **closeAddContextAddOnBar**(`guestConnection`: `any`): `any`

close the add context add on dialog

#### Parameters

##### guestConnection

`any`

the guest connection

#### Returns

`any`

***

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

***

### selectContentExtensionSetSelectedAssets()

> `static` **selectContentExtensionSetSelectedAssets**(`guestConnection`: `any`, `extensionId`: `string`, `assets`: [`Asset`](../type-aliases/Asset.md)[]): `any`

set the selected assets

#### Parameters

##### guestConnection

`any`

the guest connection

##### extensionId

`string`

the extension id of the content select content add ons, this id will be used to identify the content select content add ons

##### assets

[`Asset`](../type-aliases/Asset.md)[]

the selected assets

#### Returns

`any`

***

### selectContentExtensionSync()

> `static` **selectContentExtensionSync**(`guestConnection`: `any`): `Promise`\<\{ `selectedAssets`: [`Asset`](../type-aliases/Asset.md)[]; `selectionLimit`: `number`; \}\>

sync the selected assets

#### Parameters

##### guestConnection

`any`

the guest connection

#### Returns

`Promise`\<\{ `selectedAssets`: [`Asset`](../type-aliases/Asset.md)[]; `selectionLimit`: `number`; \}\>

the selected assets and the total count of left assets
