import * as fs from 'fs';
import * as path from 'path';
import { TestBed } from '@angular/core/testing';

export function setupComponentForTesting(componentKlass: any, templatePath: string | string[]) {
  if (typeof templatePath === 'string') {
    templatePath = [templatePath];
  }

  TestBed.overrideComponent(componentKlass, {
    set: {
      styleUrls: [],
      template: fs.readFileSync(path.join(__dirname, ...templatePath)).toString(),
      templateUrl: undefined,
    },
  });
}
