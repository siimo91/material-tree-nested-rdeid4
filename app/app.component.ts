import { ChangeDetectorRef, Component, Injectable } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlattener,
  MatTreeNestedDataSource
} from '@angular/material/tree';
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators/map';

/**
 * Node for game
 */
export class GameNode {
  children: BehaviorSubject<GameNode[]>;
  constructor(
    public item: string,
    public borderColor: string,
    children?: GameNode[],
    public parent?: GameNode
  ) {
    this.children = new BehaviorSubject(children === undefined ? [] : children);
  }
}

/**
 * The list of color
 */

var colors : string[] = [
  "#25ace0",
  "#243e8f",
  "#a7cd45",
  "#7441a2",
  "#FF5733",
  "#7441a8",
  "#F9FF33"
];

/**
 * The list of games
 */
const TREE_DATA = [
  new GameNode('Nature dappelant', colors[0],[
    new GameNode('fixe français', colors[1], [
      new GameNode('Origine Géographique' , colors[2], [new GameNode('Nord; Planning', colors[6] , [new GameNode('Hors Planning', colors[4])]), new GameNode('Sud de la Fra...;Direct', colors[6]), new GameNode('Hors secteurs crées', colors[6])])
    ]),
    new GameNode('Mobile français', colors[1] , [
      new GameNode('Planning', colors[2])
    ]),
    new GameNode('Autres Natures dappelant', colors[1])
  ])
];
/**
 * @title Nested tree
 */
@Component({
  selector: 'material-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  recursive: boolean = false;
  levels = new Map<GameNode, number>();
  treeControl: NestedTreeControl<GameNode>;

  dataSource: MatTreeNestedDataSource<GameNode>;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.treeControl = new NestedTreeControl<GameNode>(this.getChildren);
    this.dataSource = new MatTreeNestedDataSource();
    this.dataSource.data = TREE_DATA;
  }

  getChildren = (node: GameNode) => {
    return node.children;
  };

  hasChildren = (index: number, node: GameNode) => {
    return node.children.value.length > 0;
  };

  onItemSelected(node: GameNode) {
   console.log('selected :  '+node.item)
   
  }

  onSetColor(node){
    
  }

}
