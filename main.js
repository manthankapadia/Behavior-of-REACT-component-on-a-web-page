class EmployeeTableRow extends React.Component {
  render(){
    var active = "danger";
    var activeColor="red";
    if(this.props.employee.active){
      active="success";
      activeColor="green";
    }
    return (
      <tr>
      <td><center>{this.props.employee.first_name}</center></td>
      <td><center>{this.props.employee.last_name}</center></td>
      <td><center>{this.props.employee.email}</center></td>
      <td><center>{this.props.employee.title}</center></td>
      <td><center>{this.props.employee.gender}</center></td>
      <td className={active} bgcolor={activeColor} ><center>{this.props.employee.active.toString()}</center></td>
      </tr>
    );
  }
}

class EmployeeTable extends React.Component{

  constructor(props){
    super(props);
  }
  render(){
    const employees = this.props.emp.map((employee, i) => {
      return <EmployeeTableRow employee={employee} key={i} />
    });
    return(
<div>
        <center><table className="table table-bordered">
        <thead>
        <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>E-mail</th>
        <th>Gender</th>
        <th>Title</th>
        <th>Active</th>
        </tr>
        </thead>
        <tbody>
        
        {employees}
        
        </tbody>
        </table></center>
        </div>
    );
  }
}


class PageComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {employees:[]};
    this.loadData = this.loadData.bind(this);
  }

  render(){

    return (

  <div>
  <h1><center> ITMD 565 - Project 2</center></h1>
  <h3><center>Manthan Kapadia - mkapadia1@hawk.iit.edu</center></h3>
  <center><LoadBtn clickHandler={this.loadData} /></center>
  <EmployeeTable emp = {this.state.employees} />
  </div>
);
}

componentDidMount(){
  this.loadData();
}

loadData(){
  fetch('http://libertyville.rice.iit.edu/scripts/4565_lab3.php')
  .then((res) => res.json())
  .then((data) => {
  this.setState({employees: data});
  console.log(this.state.employees);
  });
}
}

class LoadBtn extends React.Component {
  render(){
    return(

      <button onClick={this.props.clickHandler}>Load Data</button>
    );
  }
}


ReactDOM.render(<PageComponent />, document.getElementById('root'));
