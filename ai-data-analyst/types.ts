/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */
export interface AppDefinition {
  id: string;
  name: string;
  icon: string;
  description:string;
}

export interface InteractionData {
  id: string | undefined;
  type: string;
  value?: string;
  elementType: string;
  elementText: string;
  appContext: string | null;
}
