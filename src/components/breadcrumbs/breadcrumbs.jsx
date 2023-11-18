import { Link } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

const routes = [
  { path: '/', breadcrumb: 'Home' },
  { path: '/clients/', breadcrumb: 'Clientes' },
  { path: '/clients/register/', breadcrumb: 'Cadastrar Clientes' },
  { path: '/clients/:id/', breadcrumb: 'Alterar Cliente' },
  { path: '/search/', breadcrumb: 'Buncar Clientes' },
  { path: '/report/', breadcrumb: 'Relatórios' },
  { path: '/employess/', breadcrumb: 'Funcionários' },
  { path: '/employees/register/', breadcrumb: 'Cadastrar Funcionários' },
  { path: '/search/employees/', breadcrumb: 'Buscar Funcionários' },
  { path: '/users/:id/', breadcrumb: 'Alterar Funcionário' },
  { path: '/profile/', breadcrumb: 'Editar Perfil' },
];

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routes);
  console.log(breadcrumbs);
  return (
    <nav>
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <Link key={match.url} to={match.pathname} className={match.pattern.path == location.pathname ? "breadcrumb-active" : "breadcrumb-not-active"}>
          {breadcrumb.props.children} - 
        </Link>
      ))}
    </nav>
  );
}

export default Breadcrumbs;