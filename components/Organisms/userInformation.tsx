import { UserInfo } from "types/type";

export const UserInformation = (props: UserInfo) => {
  if (!props.name) return null;

  const userInfo = props.orderUserInfoChange
    ? {
        name: props.ordererName,
        zip: props.ordererZip,
        address: props.ordererAddress,
        tel: props.ordererTel,
      }
    : {
        name: props.name,
        zip: props.zip,
        address: props.address,
        tel: props.tel,
      };

  return (
    <div className="mb-1 rounded-md">
      <div className="grid h-24 grid-cols-7 gap-1 sm:gap-1">
        <p className="col-span-3 flex items-center justify-center sm:col-span-2">
          お届け先
        </p>

        <div className="col-span-4 flex items-center">
          <ul>
            <li>{userInfo.name}&nbsp;様</li>
            <li>〒{userInfo.zip}</li>
            <li>{userInfo.address}</li>
            <li>{userInfo.tel}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
