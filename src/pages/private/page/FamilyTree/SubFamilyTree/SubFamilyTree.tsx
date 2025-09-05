import { CustomerModel } from 'context/entities/customer.model';

import Person from '../Person';
import TreeConnector from '../TreeConnector';

interface SubFamilyTreeProps extends CustomerModel.SubFamilyTreeProps {
  isLoading?: boolean;
}

const SubFamilyTree = ({
  level,
  treeData,
  addChildren,
  parentId,
  isLoading = false,
}: SubFamilyTreeProps) => {
  const renderCouple = () => (
    <div className='couple-container bg-white rounded-xl shadow-lg border-2 border-gray-200 p-4 hover:shadow-xl transition-all duration-300 hover:border-blue-300'>
      <div className='flex items-center gap-3'>
        <Person
          member={treeData}
          addChildren={addChildren}
          parentId={parentId}
        />
        {(treeData?.wife || treeData?.husband) && (
          <div className='flex items-center'>
            <div className='w-8 h-0.5 bg-gray-400 mx-2'></div>
            <Person
              member={treeData?.wife ?? treeData?.husband}
              isDescendant={level === 0}
              parentId={parentId}
              addChildren={addChildren}
            />
          </div>
        )}
      </div>
    </div>
  );

  const levelParentId = (
    member: CustomerModel.ParentDto,
    memberLevel: number
  ): number[] => {
    if (memberLevel === 0) {
      return parentId;
    } else {
      return [...parentId, member.id];
    }
  };

  const renderChildren = () => (
    <ul
      key={treeData.id}
      className='children-container relative flex flex-row items-baseline justify-center gap-8 pt-8'
    >
      {/* Vertical connection line from parent to children */}
      <TreeConnector
        type='vertical'
        className='absolute top-0 left-1/2 transform -translate-x-1/2'
      />

      {treeData.children &&
        treeData.children.map((member, index) => (
          <div key={member.id} className='relative'>
            {/* Horizontal connection lines between siblings */}
            {index > 0 && (
              <TreeConnector
                type='horizontal'
                className='absolute top-0 left-0 transform -translate-y-1/2'
              />
            )}
            <SubFamilyTree
              level={level + 1}
              treeData={member}
              addChildren={addChildren}
              parentId={levelParentId(member, level + 1)}
              isLoading={isLoading}
            />
          </div>
        ))}
    </ul>
  );

  return (
    <li className='tree-node relative flex flex-col items-center'>
      {renderCouple()}
      {treeData.children && treeData.children.length > 0 && renderChildren()}

      {/* Loading indicator */}
      {isLoading && (
        <div className='absolute inset-0 bg-white bg-opacity-75 rounded-xl flex items-center justify-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        </div>
      )}
    </li>
  );
};

export default SubFamilyTree;
