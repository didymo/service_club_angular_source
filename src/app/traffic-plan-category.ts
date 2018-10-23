export class TrafficPlanCategory {
 /*
  TODO: the return values may to the traffic management plan id,
  the title of the page and a series of text blocks to allow the page to be laid out.
  */
  Heading: string;
  Text: string;
}

// 2018/10/3 problem here
export class ClassResponse {
title: string;
class: string;
sections: Section[];
}

export class Section {
  sectionName: string;
  sectionContent: string;
}

export class BulletPoints {
  bulletPoint: string;
}
