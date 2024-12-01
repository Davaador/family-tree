import { Spin } from 'antd';
import { CustomerModel, Gender } from 'context/entities/customer.model';
import { parentService } from 'context/services/parent.service';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import SubFamilyTree from './SubFamilyTree/SubFamilyTree';

export interface IMember {
  name: string;
  gender: Gender;
  spouse: IMember | null;
  children: IMember[];
}

// const SubFamilyTree = ({
//   level = 0,
//   treeData,
//   addChildren,
// }: CustomerModel.SubFamilyTreeProps) => {
//   const renderCouple = () => (
//     <div className="border-solid border-gray-300 border p-2 rounded-md inline-block">
//       <Person member={treeData} addChildren={addChildren} />
//       <Person member={treeData?.spouse} isDescendant={level === 0 && true} />
//     </div>
//   );

//   const renderChildren = () => (
//     // <p>test</p>
//     <ul
//       key={treeData.id}
//       className="pt-14 relative flex flex-row items-baseline justify-center"
//     >
//       {treeData.children &&
//         treeData.children.map((member) => (
//           // <p>testss</p>
//           <SubFamilyTree level={level + 1} key={member.id} treeData={member} />
//         ))}
//     </ul>
//   );

//   console.log(treeData.children, 'tttttttt');

//   return (
//     <li className="float-left list-none relative pt-14 px-2">
//       {renderCouple()}
//       {treeData.children && treeData.children.length > 0 && renderChildren()}
//     </li>
//   );
// };

const FamileTree = () => {
  const { treeData } = useLoaderData() as CustomerModel.SubFamilyTreeProps;
  const [familyData, setFamilyData] =
    useState<CustomerModel.ParentDto>(treeData);

  const [loading, setLoading] = useState<boolean>(false);
  const addChildren = (id: number[]) => {
    console.log(id, 'sdss');
    if (id) {
      setLoading(true);
      parentService
        .findByParentId(id)
        .then((res) => {
          console.log(res, 'sdsd');
          // if (childrenData) {
          //   childrenData?.children = res;
          // }
          setFamilyData(res);
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }

    // console.log('aaa', newChildren);
    // setFamilyData((prevFamilyData) => ({
    //   ...prevFamilyData,
    //   children: [...(prevFamilyData.children || []), newChildren],
    // }));
  };

  if (loading)
    return (
      <div className="flex justify-center">
        <Spin size="large" />
      </div>
    );
  return (
    <div className="tree whitespace-nowrap">
      <ul className="relative flex flex-row items-baseline justify-center">
        <SubFamilyTree
          treeData={familyData}
          addChildren={addChildren}
          parentId={[familyData.id]}
          level={0}
        />
      </ul>
    </div>
  );
};

export default FamileTree;
