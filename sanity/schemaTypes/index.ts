import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {postType} from './postType'
import {homeHeroType} from './homeHeroType'
import {faqSectionType} from './faqSectionType'
import {ctaSectionType} from './ctaSectionType'
import {industriesSectionType} from './industriesSectionType'
import {successStoriesSectionType} from './successStoriesSectionType'
import {insightsSectionType} from './insightsSectionType'
import {techPartnersSectionType} from './techPartnersSectionType'
import {techStackSectionType} from './techStackSectionType'
import {featuredClientsSectionType} from './featuredClientsSectionType'
import {whyChooseSectionType} from './whyChooseSectionType'
import {processSectionType} from './processSectionType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, postType, homeHeroType, faqSectionType, ctaSectionType, industriesSectionType, successStoriesSectionType, insightsSectionType, techPartnersSectionType, techStackSectionType, featuredClientsSectionType, whyChooseSectionType, processSectionType],
}