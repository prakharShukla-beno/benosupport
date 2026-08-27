import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {postType} from './postType'
import {homeHeroType} from './homeHeroType'
import {faqSectionType} from './faqSectionType'
import {ctaSectionType} from './ctaSectionType'
import {whyChooseSectionType} from './whyChooseSectionType'
import {processSectionType} from './processSectionType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, postType, homeHeroType, faqSectionType, ctaSectionType, whyChooseSectionType, processSectionType],
}