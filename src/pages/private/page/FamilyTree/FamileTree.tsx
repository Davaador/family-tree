import { CustomerModel, Gender } from 'context/entities/customer.model';
import { parentService } from 'context/services/parent.service';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import SubFamilyTree from './SubFamilyTree/SubFamilyTree';
import './FamilyTree.css';

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
  const [isLoading, setIsLoading] = useState(false);

  const addChildren = async (id: number[]) => {
    if (id && !isLoading) {
      setIsLoading(true);
      try {
        const res = await parentService.findByParentId(id);
        setFamilyData(res);
      } catch (error) {
        console.error('Failed to load children:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Гэр бүлийн мод
          </h1>
          <p className="text-gray-600">Таны гэр бүлийн түүх, холбоо, уялдаа</p>
        </div>

        {/* Tree Container */}
        <div className="bg-white rounded-2xl shadow-xl p-6 overflow-x-auto">
          <div className="tree-container min-w-max">
            <div className="tree-wrapper relative">
              <ul className="tree-root flex flex-row items-baseline justify-center">
                <SubFamilyTree
                  treeData={familyData}
                  addChildren={addChildren}
                  parentId={[familyData.id]}
                  level={0}
                  isLoading={isLoading}
                />
              </ul>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Тайлбар</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-male border-2 border-gray-300"></div>
              <span className="text-sm text-gray-600">Эрэгтэй</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-female border-2 border-gray-300"></div>
              <span className="text-sm text-gray-600">Эмэгтэй</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-gray-300"></div>
              <span className="text-sm text-gray-600">Нэмэлт мэдээлэл</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamileTree;
