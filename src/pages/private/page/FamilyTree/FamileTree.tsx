import { Spin } from 'antd';
import { CustomerModel, Gender } from 'context/entities/customer.model';
import { parentService } from 'context/services/parent.service';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import SubFamilyTree from './SubFamilyTree/SubFamilyTree';

export interface IMember {
  name: string;
  gender: Gender;
  spouse: IMember | null;
  children: IMember[];
}

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
          setFamilyData(res);
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }
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
