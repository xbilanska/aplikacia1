import { Component, Input } from '@angular/core';
import { TreeNode, TREE_ACTIONS, KEYS, IActionMapping } from 'angular2-tree-component';

const actionMapping:IActionMapping = {
  mouse: {
    contextMenu: (tree, node, $event) => {
      $event.preventDefault();
      alert(`context menu for ${node.data.name}`);
    },
    dblClick: (tree, node, $event) => {
      if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
    },
    click: (tree, node, $event) => {
      $event.shiftKey
        ? TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
        : TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event)
    }
  },
  keys: {
    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
  }
};

@Component({
  selector: 'app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  public NAME = "";
  public ID;
  public edited = false;

  nodes:any[] = null;
  constructor() {
    setTimeout(() => {
      this.nodes = [
        {

          expanded: true,
          name: 'root expanded',
          id: 1,
          children: [
            {
              name: 'child1',
              id: 2,
              hasChildren: false
            }, {

              name: 'child2',
              id: 3,
              hasChildren: false
            }
          ]
        },
        {
          name: 'root2',
          id: 4,
          children: [
            {
              name: 'child2.1',
              id: 5,
              hasChildren: false
            }, {

              name: 'child2.2',
              id: 6,
              children: [
                {
                  uuid: 1001,
                  name: 'subsub',
                  id: 8,
                  hasChildren: false
                }
              ]
            }
          ]
        },
        {

          name: 'asyncroot',
          hasChildren: true
        }
      ];
    }, 1);
  }

  asyncChildren = [
    {
      name: 'child2.1',
      subTitle: 'new and improved'
    }, {
      name: 'child2.2',
      subTitle: 'new and improved2'
    }
  ];

  getChildren(node:any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.asyncChildren.map((c) => {
        return Object.assign({}, c, {
          hasChildren: node.level < 5
        });
      })), 1000);
    });
  }

  addNode(tree) {
    this.nodes[0].children.push({
      name: 'a new child'
    });
    tree.treeModel.update();
  }

  addMainNode(tree){
    this.nodes.push({
      name: 'nieco nove'
    });
      tree.treeModel.update();
  }

  childrenCount(node: TreeNode): string {
    return node && node.children ? `(${node.children.length})` : '';
  }

  filterNodes(text, tree) {
    tree.treeModel.filterNodes(text, true);
  }

  activateSubSub(tree) {
     //tree.treeModel.getNodeBy((node) => node.data.name = 'subsub')
    tree.treeModel.getNodeById(1001)
      //.setActiveAndVisible();
  }

  updateName(editName){
    alert(editName);
  }

  ukaz(info){
    this.NAME=info.name;
    this.ID = info.id;
    //alert(info.name);  
  }

  customTemplateStringOptions = {
    // displayField: 'subTitle',
    isExpandedField: 'expanded',
    idField: 'uuid',
    getChildren: this.getChildren.bind(this),
    actionMapping,
    allowDrag: true
  }
  onEvent = console.log.bind(console);

  /*go($event) {
    $event.stopPropagation();
    alert('${node.data.name}')
  }*/


}