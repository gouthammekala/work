
import React,{Component } from "react";
import ReactDataGrid from "react-data-grid";
import CustomRowRenderer from './CustomRowRenderer';
// import { Menu } from "react-data-grid-addons";
import ReactDOM from 'react-dom';
import createRowData from "./createRowData";
import { Menu,Data } from "react-data-grid-addons";

  const { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } = Menu;
  var scrolloffset=150; 
const defaultColumnProperties = {
    resizable: true,
    // frozen: true,
    width: 120
  };
  const ROW_COUNT = 50;
  /*
const columns = [
  { key: "id", name: "ID", frozen: true,sortDescendingFirst: true,headerRenderer:<ContextMenuTrigger id="some_unique_identifier">
  <div className="well">ID</div>
</ContextMenuTrigger> },
  { key: "title", name: "Title", editable: true,sortable: true, filterable: true, headerRenderer:<ContextMenuTrigger id="some_unique_identifier">
  <div className="well">title</div>
</ContextMenuTrigger>, resizable: true},
  { key: "complete", name: "Complete", editable: true,sortable: true ,resizable: true,}
].map(c => ({ 
    ...c, // ...defaultColumnProperties 
}));
*/


const columns = [
  {
    key: "id",
    name: "ID"
  },
  {
    key: "firstName",
    name: "First Name"
  },
  {
    key: "lastName",
    name: "Last Name"
  },
  {
    key: "jobTitle",
    name: "Job Title"
  },
  {
    key: "jobArea",
    name: "Job Area"
  },
  {
    key: "jobType",
    name: "Job Type"
  },
  {
    key: "email",
    name: "Email"
  },
  {
    key: "street",
    name: "Street"
  },
  {
    key: "zipCode",
    name: "ZipCode"
  },
  {
    key: "date",
    name: "Date"
  },
  {
    key: "catchPhrase",
    name: "Catch Phrase"
  }
].map(c => ({ ...c, ...defaultColumnProperties }));
/*
const rows = [
  { id: 0, title: "Task 1", complete: 20 },
  { id: 1, title: "Task 2", complete: 30 },
  { id: 2, title: "Task 3", complete: 40 },
  { id: 3, title: "Task 4", complete: 50 },
  { id: 4, title: "Task 5", complete: 60 },
  { id: 5, title: "Task 6", complete: 70 },

  
  
];
*/
const rows= createRowData(ROW_COUNT);
console.log(rows);
for (let i=0;i<1000000;i++) {
  //rows.push({ id: 2, title: "Task 3", complete: 60 });
}
class datagridV extends Component {
  state = { rows,expandedRows:{} };

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };
constructor(props) {
    super(props);
    this.rowGetter = this.rowGetter.bind(this);
    this.handleGridSort = this.handleGridSort.bind(this);
    this.ExampleContextMenu = this.ExampleContextMenu.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.getSubRowDetails = this.getSubRowDetails.bind(this);
    this.onCellExpand = this.onCellExpand.bind(this);

}

componentDidUpdate() {
  var height = this.divElement.clientHeight;
  console.log('height',height);
}


componentDidMount() {
  const viewportHeight= this.divElement.grid;

  const height = this.divElement.clientHeight;
  console.log(viewportHeight);
    /*
    document.body.addEventListener('contextmenu', function (evt) {
        // console.log(evt.target.className);
        if (evt.target.className === 'react-grid-HeaderCell-sortable') {
            // ContextMenuTrigger();
            ContextMenuTrigger()
            console.log('Hello');
        }
        evt.preventDefault();
    }, true);
    asyncRowGetter(rowIndex) {
    let result = this.props.defaultRow;
    if (!this.state.rows[rowIndex]) {
      if (!this.rowStatus[rowIndex]) {
        this.props.getRow(rowIndex).then((response) => {
          const rows = this.state.rows.slice(0);
          rows[rowIndex] = response;
          this.setState({
            rows: rows
          });
        });
        this.rowStatus[rowIndex] = true;
      }
    } else {
      result = this.state.rows[rowIndex];
    }
    return result;
  }
    */
    // ReactDOM.findDOMNode(this).addEventListener('nv-event', this._handleNVEvent);
}

onScroll(event) {
  //console.log('onScroll',event);
  
  let result = this.state.rows;
  const row = { id: 0, title: "Goutham", complete: 20 }

  const rows = this.state.rows.slice(0);
  rows[this.state.rows.length] = row;
  // const rows = {...result,...row}
  // console.log(this.state.rows.length);
   // this.setState({rows:rows});
   var scrolltop=event.scrollTop; 
 

console.log(scrolltop);

//console.log(scrolltop, scrolloffset);
   if(scrolltop >= scrolloffset)  {
     
    scrolloffset=scrolloffset+50;
    this.setState({
       rows: Data.Selectors.getRows({rows:rows})
    });
  }
}

componentWillUnmount() {
    //ReactDOM.findDOMNode(this).removeEventListener('nv-event', this._handleNVEvent);
}

rowGetter(i) {
    console.log('PP',i  );
    return this.state.rows[i]
}

handleGridSort(sortColumn, sortDirection) {
    console.log(sortColumn, sortDirection);
}
ExampleContextMenu() {
  return (<ContextMenu id="some_unique_identifier">
  <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
    ContextMenu Item 1
  </MenuItem>
  <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
    ContextMenu Item 2
  </MenuItem>
  <MenuItem divider />
  <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
    ContextMenu Item 8888
  </MenuItem>
</ContextMenu>);
}

getSubRowDetails(rowItem)  {
  console.log(rowItem.treeDepth);
  const isExpanded = this.state.expandedRows[rowItem.id]
  ? this.state.expandedRows[rowItem.id]
  : false;
  return {
    group: rowItem.teamMembers && rowItem.teamMembers.length > 0,
    expanded: isExpanded,
    children: rowItem.teamMembers,
    field: "firstName",
    // treeDepth: rowItem.treeDepth || 1,
    siblingIndex: rowItem.siblingIndex,
    numberSiblings: rowItem.numberSiblings
  };
  /*
  let isExpanded = this.state.expanded[rowItem.site] ? this.state.expanded[rowItem.site] : false;
  return {
      group: rowItem.children && rowItem.children.length > 0,
      expanded: isExpanded,
      children: rowItem.children,
      field: ['site' , 'projects'],
      treeDepth: rowItem.treeDepth || 0,
      siblingIndex: rowItem.siblingIndex,
      numberSiblings: rowItem.numberSiblings
  };
  */
 /*

 const isExpanded = expandedRows[rowItem.id]
    ? expandedRows[rowItem.id]
    : false;
  return {
    group: rowItem.teamMembers && rowItem.teamMembers.length > 0,
    expanded: isExpanded,
    children: rowItem.teamMembers,
    field: "firstName",
    treeDepth: rowItem.treeDepth || 0,
    siblingIndex: rowItem.siblingIndex,
    numberSiblings: rowItem.numberSiblings
  };
 */
}

onCellExpand(args) {
  console.log('args',args);

  const rowKey = args.rowData.id;
  const rowIndex = this.state.rows.indexOf(args.rowData);
  
  const subRows = args.expandArgs.children;
  
  if (this.state.expandedRows && !this.state.expandedRows[rowKey]) {
    this.state.expandedRows[rowKey] = true;
    //updateSubRowDetails(subRows, args.rowData.treeDepth);
    rows.splice(rowIndex + 1, 0, ...subRows);
  } else if (this.state.expandedRows[rowKey]) {
    this.state.expandedRows[rowKey] = false;
    rows.splice(rowIndex + 1, subRows.length);
  }
  console.log(this.state.expandedRows,rows);
  const expandedRows = this.state.expandedRows;
  this.setState({rows,expandedRows});
  // return {rows };
  
}
  //i => this.state.rows[i]
  render() {
    
    const groupedRows = Data.Selectors.getRows(this.state);
    console.log(groupedRows);
    return (
        <div>
 
 
      <ReactDataGrid
        ref={ (divElement) => this.divElement = divElement}
        columns={columns}
        rowGetter={i=>groupedRows[i]}
        rowsCount={groupedRows.length}
        minHeight={800}
        minWidth={800}
        // minColumnWidth={50}
        // onGridRowsUpdated={this.onGridRowsUpdated}  // totla numer of rows*35 - mimum height
        enableCellSelect={true}
        onGridSort={this.handleGridSort}
        contextMenu={
          this.ExampleContextMenu()
        }
        onScroll={this.onScroll}
        // rowRenderer={CustomRowRenderer}
        // RowsContainer={ContextMenuTrigger}
        onColumnResize={(idx, width) =>
            console.log(`Column ${idx} has been resized to ${width}`)
          }
          rowHeight={50}
          getSubRowDetails={this.getSubRowDetails}
          onCellExpand={(args)=>this.onCellExpand(args)}

          

      />
      </div>
    );
    
  }
}
export default datagridV;


