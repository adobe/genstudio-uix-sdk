[**@adobe/genstudio-uix-sdk**](../README.md)

***

[@adobe/genstudio-uix-sdk](../globals.md) / AddContextService

# Class: AddContextService

## Constructors

### new AddContextService()

> **new AddContextService**(): [`AddContextService`](AddContextService.md)

#### Returns

[`AddContextService`](AddContextService.md)

## Methods

### getGenerationContext()

> `static` **getGenerationContext**(`connection`: `GuestUI`\<[`AddContextApi`](../interfaces/AddContextApi.md)\>): `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

#### Parameters

##### connection

`GuestUI`\<[`AddContextApi`](../interfaces/AddContextApi.md)\>

#### Returns

`Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

***

### setAdditionalContext()

> `static` **setAdditionalContext**(`connection`: `GuestUI`\<[`AddContextApi`](../interfaces/AddContextApi.md)\>, `additionalContext`: [`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>): `Promise`\<`void`\>

Sets additional context on the prompt

#### Parameters

##### connection

`GuestUI`\<[`AddContextApi`](../interfaces/AddContextApi.md)\>

The guest connection to the host

##### additionalContext

[`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>

The additional context object

#### Returns

`Promise`\<`void`\>

void

#### Throws

Error if connection is missing
