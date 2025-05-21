import React from 'react'
import FetchJobs from '../components/job/FetchJobs'
import JobSearch from '../components/job/JobSearch'

const Jobs = () => {
  return (
    <>
    <JobSearch />
    <FetchJobs />
    </>
  )
}

export default Jobs