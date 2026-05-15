type PayMethodProps = {
  ordererPayMethod: string;
};

export const PayMethod = ({
  ordererPayMethod,
}: PayMethodProps) => {
  return (
    <div className="grid grid-cols-7 h-24 gap-2">
      <p className="col-span-3 sm:col-span-2 flex items-center justify-center">
        お支払い方法
      </p>
      <p className="col-span-4 flex items-center">
        {ordererPayMethod}
      </p>
    </div>
  );
};
