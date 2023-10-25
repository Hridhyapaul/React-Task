import React, {useState} from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');

    const handleClick = (val) =>{
        setShow(val);
    }

    // Sample tasks for testing
  const sampleTasks = [
    { name: 'Task 1', status: 'active' },
    { name: 'Task 2', status: 'completed' },
    { name: 'Task 3', status: 'active' },
  ];

  // Use sampleTasks if tasks state is empty (for initial testing)
  const tasksToDisplay = tasks.length > 0 ? tasks : sampleTasks;

  // Sorting logic based on task status
  const sortedTasks = tasksToDisplay.sort((a, b) => {
    if (a.status === 'active' && b.status !== 'active') return -1;
    if (a.status === 'completed' && b.status !== 'completed' && b.status !== 'active') return -1;
    return 0;
  });

  // Filtering logic based on the selected status
  const filteredTasks =
    show === 'all'
      ? sortedTasks
      : sortedTasks.filter((task) => task.status === show);

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name"/>
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Status"/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='all' && 'active'}`} type="button" onClick={()=>handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show==='active' && 'active'}`} type="button" onClick={()=>handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='completed' && 'active'}`} type="button" onClick={()=>handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;