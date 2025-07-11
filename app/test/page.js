"use client";

import { useGetAllCollegesQuery } from "@/redux/api/collegeApi";
import React from "react";

const Page = () => {
  const { data, error, isLoading } = useGetAllCollegesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching colleges.</p>;

  return (
    <div>
      <h1>Colleges List</h1>
      <ul>
        {data?.data?.map((college) => (
          <li key={college.id}>{college.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
