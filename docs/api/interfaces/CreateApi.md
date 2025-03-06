[**@adobe/genstudio-uix-sdk**](../README.md)

***

[@adobe/genstudio-uix-sdk](../globals.md) / CreateApi

# Interface: CreateApi

## Extends

- `VirtualApi`

## Indexable

\[`key`: `string`\]: `object` \| (...`args`: `unknown`[]) => `unknown`

## Properties

### api

> **api**: \{ `create`: \{ `getGenerationContext`: () => `Promise`\<`any`\>; `updateAdditionalContext`: (`additionalContext`: [`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>) => `Promise`\<`void`\>; \}; \}

#### create

> **create**: \{ `getGenerationContext`: () => `Promise`\<`any`\>; `updateAdditionalContext`: (`additionalContext`: [`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>) => `Promise`\<`void`\>; \}

##### create.getGenerationContext()

> **getGenerationContext**: () => `Promise`\<`any`\>

###### Returns

`Promise`\<`any`\>

##### create.updateAdditionalContext()

> **updateAdditionalContext**: (`additionalContext`: [`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>) => `Promise`\<`void`\>

###### Parameters

###### additionalContext

[`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>

###### Returns

`Promise`\<`void`\>
