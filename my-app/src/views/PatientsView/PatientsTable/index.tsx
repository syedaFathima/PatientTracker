import * as React from "react";
import { Box } from "@material-ui/core";
import Table, {
  TableColumns,
  TableSortOptions,
} from "../../../components/Table";
import { useStyles } from "./styles";
import {
  formatName,
  getAddressString,
  getMobilePhone,
  getResponseTime,
  PatientData,
  PatientRecord,
} from "../../../utils/patientHelper";
import axios from "axios";
import _ from "lodash";

type PatientTableProps = {
  search: any;
  searchTime: string;
  list?: any;
};
const PatientsTable: React.FC<PatientTableProps> = ({ search, searchTime }) => {
  const classes = useStyles();
  const [timer, setTimer] = React.useState("");

  const columns: TableColumns[] = React.useMemo(() => {
    return [
      { id: "fullName", label: "Name", sortable: false },
      { id: "dateOfBirth", label: "date Of Birth", sortable: false },
      { id: "address", label: "Address", sortable: false },
      { id: "gender", label: "gender", sortable: false },
      { id: "phoneNumber", label: "Phone", sortable: false },
    ];
  }, []);
  const [patientsRecords, setPatientsRecords] = React.useState<any>({});
  const [totalRecords, setTotalRecords] = React.useState<number>(0);
  const defaultSortOptions = React.useMemo(
    (): TableSortOptions[] => [
      { orderBy: "fullName", order: "asc" },
      { orderBy: "dateOfBirth", order: "asc" },
    ],
    []
  );
  const [sortOptions, setSortOptions] =
    React.useState<TableSortOptions[]>(defaultSortOptions);

  const handleRequestSort = React.useCallback(
    (sortOptions) => setSortOptions(sortOptions),
    [setSortOptions]
  );

  /** Get list of patient records */
  const getPatients = React.useCallback(async () => {
    const startTime = Date.now();
    const data: PatientData = await axios
      .get(
        "https://try.smilecdr.com/baseR4/Patient?_sort=given,family,birthdate&_count=100"
      )
      .then((res) => {
        setTimer(getResponseTime(startTime));
        setTotalRecords(res.data.total);
        return res.data;
      });
    setPatientsRecords(data);
  }, []);

  React.useEffect(() => {
    getPatients();
  }, []);

  /** Modify the data to map to the Table */
  const tableData = React.useMemo(() => {
    if (search) {
      setTimer(searchTime);
      setPatientsRecords(search);
    }
    return patientsRecords?.entry?.map((rawData: PatientRecord) => {
      return {
        id: rawData?.resource?.id,
        fullName: formatName(rawData?.resource?.name) || "",
        dateOfBirth: rawData?.resource?.birthDate || "",
        gender: _.startCase(rawData?.resource?.gender) || "",
        address: rawData?.resource?.address
          ? getAddressString(rawData?.resource?.address)
          : "",
        phoneNumber: rawData?.resource?.telecom
          ? getMobilePhone(rawData?.resource?.telecom)
          : "",
      };
    });
  }, [patientsRecords, search]);
  return (
    <>
      <Box className={classes.tabBody}>
        <Table
          cellHeight={52}
          columns={columns}
          data={tableData}
          defaultSortOptions={defaultSortOptions}
          headerClassName={classes.headerCell}
          onRequestSort={handleRequestSort}
          placeholderSize="large"
          totalCount={totalRecords}
          rowsPerPage={100}
          rowsPerPageOptions={[100]}
          patientData={patientsRecords?.link}
        />
      </Box>
      <Box className={classes.timer}>
        <span>Data fetched in:</span>
        <span>
          <b>{timer}</b>
        </span>
      </Box>
    </>
  );
};
export default PatientsTable;
