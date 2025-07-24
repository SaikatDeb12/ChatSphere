import React from "react";

const EmptySpace: React.FC = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center bg-gray-50">
            <div className="max-w-md text-center">
                <div className="mx-auto h-24 w-24 text-gray-400"></div>
                <p className="mt-1 text-sm text-gray-500">
                    Choose a conversation from the sidebar to start messaging.
                </p>
            </div>
        </div>
    );
};

export default EmptySpace;

// const EmptySpace: React.FC = () => {
//     return (
//         <div className="px-4 py-10 sm:px-6 lg:px-8 h-screen flex justify-center items-center bg-gray-100">
//             <div className="text-center flex flex-col items-center">
//                 <h3 className="mt-2 text-2xl font-semibold text-gray-900">
//                     Select a chat or start a new conversation
//                 </h3>
//             </div>
//         </div>
//     );
// };
//
// export default EmptySpace;
