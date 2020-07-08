import React from 'react';
import DataTable from 'react-data-table-component';
import { TablePagination } from '@material-ui/core';
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";


 
const data = [{ assetid: 1, name: 'HP Pavillion', serial_no: 1982, status: 'Dispatched' },
{ assetid: 4, name: 'HP Pavillion', serial_no: 1682, status: 'Dispatched' }
];
const columns = [
  {
    name: 'Asset Name',
    selector: 'name',
    sortable: true,
    right: true,
  },
  {
    name: 'asset_id',
    selector: 'assetid',
    sortable: true,
    right: true,
  },
  {
    name: 'Serial Number',
    selector: 'serial_no',
    sortable: true,
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    right: true,
  },
];

export default class AssetStore extends React.Component {
    render(){
        return (
            <div>
              <Card>
            <DataTable
              columns={columns}
              data={data}
              sortIcon={<SortIcon />}
              pagination
            />
            </Card>
            </div>
          )
    }
}
