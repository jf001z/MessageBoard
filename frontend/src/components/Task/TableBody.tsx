import React, { FC } from 'react';
import MaterialTable, { Column } from 'material-table';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
import { Group, Status, User } from '../../@types';
import { tableIcons } from './TableIcons';

interface Props {
  group: Group;
}
interface Row {
  name: string;
  status: Status;
  start_date: number;
  end_date: number;
  //users: Partial<User>[];
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    marginTopBottom: {
      marginTop: '40px',
      marginBottom: '40px',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);
const selectBgColor = (status: Status) => {
  switch (status) {
    case Status.WORKING:
      return '#039be5';
    case Status.STUCK:
      return '#ff3d00';
    case Status.NONE:
      return '#b2aa9c';
    case Status.REVIEW:
      return '#ff9100';
    case Status.DONE:
      return '#00e676';
  }
};
export const TableBody: FC<Props> = (props: Props) => {
  const { group } = props;
  const classes = useStyle();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: 'Step Name', field: 'name', width: 200 },
      {
        title: 'Start Date',
        field: 'start_date',
        type: 'date',
        width: 200,
        render: (rowData) => format(rowData.start_date, 'dd-MM-yyyy'),
      },
      {
        title: 'End Date',
        field: 'end_date',
        type: 'date',
        width: 200,
        render: (rowData) => format(rowData.end_date, 'dd-MM-yyyy'),
      },
      {
        title: 'Status',
        field: 'status',
        width: 200,
        lookup: {
          [Status.DONE]: Status.DONE,
          [Status.NONE]: Status.NONE,
          [Status.REVIEW]: Status.REVIEW,
          [Status.STUCK]: Status.STUCK,
          [Status.WORKING]: Status.WORKING,
        },
        cellStyle: (_, row) => {
          return {
            backgroundColor: row ? selectBgColor(row.status) : Status.NONE,
            color: '#FFF',
          };
        },
      },
      //{ title: 'Users', field: 'users' },
    ],
    data:
      (group.items || []).map((item) => ({
        name: item.name || '',
        start_date: item.start_date || 0,
        end_date: item.end_date || 0,
        //users: item.users || [],
        status: item.status || Status.NONE,
      })) || [],
  });

  return (
    <div className={classes.marginTopBottom}>
      <MaterialTable
        title={`Project: ${group.name}`}
        columns={state.columns}
        data={state.data}
        icons={tableIcons}
        options={{
          paging: false,
          search: false,
          //fixedColumns: { left: 1 },
        }}
        editable={{
          onRowAdd: () =>
            new Promise((resolve) => {
              handleOpen();
              resolve();
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                handleOpen();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: () =>
            new Promise((resolve) => {
              handleOpen();
              resolve();
            }),
          // new Promise((resolve) => {
          //   setTimeout(() => {
          //     resolve();
          //     setState((prevState) => {
          //       const data = [...prevState.data];
          //       data.splice(data.indexOf(oldData), 1);
          //       return { ...prevState, data };
          //     });
          //   }, 600);
          // }),
        }}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Sorry</h2>
            <p id="transition-modal-description">
              This function is under constructions. Updates is not pushed to the
              server.
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
