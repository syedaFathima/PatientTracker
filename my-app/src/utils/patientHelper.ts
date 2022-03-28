import _ from "lodash";

type Order = "asc" | "desc";

export type SortOptions = {
  orderBy: string | ((data: any) => string);
  order?: Order;
};

export const lodashSort = (data: any[], sortOptions: SortOptions[]) => {
  const orderByList: any[] = [];
  const orderList: Order[] = [];

  for (let i = 0; i < sortOptions.length; i += 1) {
    const { orderBy, order = "asc" } = sortOptions[i];
    orderByList.push(orderBy);
    orderList.push(order);
  }

  if (orderByList.length === 0) return data;
  const ordered = _.orderBy(data, orderByList, orderList);
  return ordered;
};
export type PatientData = {
  link: any[];
  entry: any;
};

export type Name = {
  family?: string;
  given: string[];
};

export type Address = {
  line: string[];
  city: string;
  state: string;
  postalCode: string;
};
export type Phone = {
  system: string;
  value: string;
  use: string;
  rank: number;
};
export type Resource = {
  resourceType: string;
  id: string;
  meta: {
    versionId: string;
    lastUpdated: string;
    source: string;
  };
  name: Name[];
  telecom: Phone[];
  gender: string;
  birthDate: string;
  address: Address[];
};

export type Entry = {
  fullUrl: string;
  resource: Resource;
  search: { mode: string };
};

export type ResourceType = {
  resourceType: string;
  id: string;
  meta: { lastUpdated: string };
  type: string;
  total: number;
  link: string[];
  entry: Entry[];
};

export type PatientRecord = {
  fullUrl: string;
  resource: Resource;
  search: string;
};

export const formatName = (name: Name[]) => {
  const firstName = name[0]?.given?.join(" ").trim() || "";
  const lastName = name[0]?.family || "";
  return firstName + " " + lastName;
};

export const formatPatientsData = (patientsRecords: any) => {
  console.log({ patientsRecords });
};
export const getMobilePhone = (phone: Phone[]) => {
  const phoneNumber = phone.filter((phone) => phone.use === "mobile");
  return phoneNumber.map((phNo) => phNo.value).join();
};
export const getAddressString = (address: Address[]): string => {
  return (
    address &&
    address[0] &&
    `${address[0].line ? address[0].line.join("") + "," : ""} ${
      address[0].city ? address[0].city + ", " : ""
    }${address[0].state || ""} ${
      address[0].postalCode ? address[0].postalCode : ""
    }`
  );
};

export const getResponseTime = (startTime: any) => {
  let now = Date.now();
  let seconds = Math.floor((now - startTime) / 1000);
  let milliseconds = Math.floor((now - startTime) % 1000);
  return `${seconds}.${milliseconds} seconds`;
};
export const getBirthDate = () => {};
