/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */
import React from 'react';

interface GeneratedContentProps {
  htmlContent: string;
}

export const GeneratedContent: React.FC<GeneratedContentProps> = ({
  htmlContent,
}) => {
  return (
    <div
      className="w-full h-full"
      dangerouslySetInnerHTML={{__html: htmlContent}}
    />
  );
};
