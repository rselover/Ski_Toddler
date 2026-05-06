const {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ThemeProvider,
  createTheme,
  Card,
  CardHeader,
  CardContent,
  Collapse,
  Button
} = window['MaterialUI'];

const e = React.createElement;
const useState = React.useState;

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

function CollapsibleCard({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return e(Card, { sx: { mb: 3, background: "#222", color: "#eee", borderRadius: 2 } },
    e(CardHeader, {
      title: e(Typography, { variant: 'h6', sx: { color: "#90caf9" } }, title),
      action: e(IconButton, {
        onClick: () => setOpen(!open),
        color: "inherit"
      }, e('span', { className: 'material-icons' }, open ? 'expand_less' : 'expand_more'))
    }),
    e(Collapse, { in: open, timeout: "auto", unmountOnExit: false },
      e(CardContent, null, children)
    )
  );
}

function App() {
  const [open, setOpen] = useState(false); // Drawer starts closed

  const handleDrawerToggle = () => setOpen(!open);

  return e(ThemeProvider, { theme: darkTheme },
    e(CssBaseline),
    e(AppBar, { position: 'fixed', sx: { zIndex: 1300 } },
      e(Toolbar, null,
        e(IconButton, {
          color: 'inherit',
          edge: 'start',
          onClick: handleDrawerToggle,
          sx: { mr: 2 }
        }, e('span', { className: 'material-icons' }, open ? 'chevron_left' : 'menu')),
        e(Typography, { variant: 'h6', noWrap: true, component: 'div' }, 'Denver Learn to Ski Options')
      )
    ),
    e(Drawer, {
      variant: 'persistent',
      open: open,
      sx: {
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' }
      }
    },
      e(Toolbar),
      e(Box, { sx: { overflow: 'auto' } },
        e(List, null,
          e(ListItem, { button: true, onClick: () => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' }) },
            e(ListItemText, { primary: 'Map' })
          ),
          e(ListItem, { button: true, onClick: () => document.getElementById('plot')?.scrollIntoView({ behavior: 'smooth' }) },
            e(ListItemText, { primary: 'Ranked Options' })
          ),
          e(ListItem, { button: true, onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
            e(ListItemText, { primary: 'About' })
          )
        )
      )
    ),
    e(Box, {
      component: 'main',
      sx: {
        flexGrow: 1,
        bgcolor: 'background.default',
        p: 3,
        marginLeft: open ? '240px' : '0px',
        transition: 'margin-left 0.3s'
      }
    },
      e(Toolbar),
      e(Container, { maxWidth: 'lg' },
        e(Typography, { variant: 'h4', gutterBottom: true }, 'Denver Learn to Ski Options'),
        e(Typography, { variant: 'subtitle1', gutterBottom: true },
          "Toddler Ski Cost – Where's the Best Spot near Denver to Learn to Ski?"
        ),
        e(CollapsibleCard, { title: "Map", defaultOpen: true },
          e('div', {
            id: 'map',
            style: {
              width: '100%',
              margin: '2rem 0',
              border: '1px solid #333',
              borderRadius: '8px',
              background: '#222'
            }
          })
        ),
        e(CollapsibleCard, { title: "Ranked Options", defaultOpen: true },
          e('div', { id: 'plot', style: { width: '100%', margin: '2rem 0' } })
        ),
        e(CollapsibleCard, { title: "About", defaultOpen: true },
          e('div', { id: 'about', style: { padding: '1rem 0' } },
            e(Typography, { variant: 'body1', gutterBottom: true },
              'This app helps parents find the best ski resorts near Denver for toddlers and young kids learning to ski.'
            ),
            e(Typography, { variant: 'body2', sx: { color: '#aaa' } },
              'Data includes walkup prices, learn-to-ski acreage, drive times, snowfall, and a composite score ranking each resort for the family ski experience.'
            ),
            e(Typography, { variant: 'body2', sx: { mt: 2, color: '#aaa' } },
              'Made by: Rob Selover and Claude Sonnet 4.6'
            ),
            e(Box, { sx: { display: 'flex', gap: 2, mt: 1 } },
              e('a', {
                href: 'https://linkedin.com/in/rselover',
                target: '_blank',
                rel: 'noopener noreferrer',
                style: {
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: '#0077b5', color: '#fff',
                  padding: '6px 14px', borderRadius: '4px',
                  fontWeight: '700', fontSize: '13px', textDecoration: 'none'
                }
              },
                e('span', { className: 'material-icons', style: { fontSize: '16px' } }, 'person'),
                'LinkedIn'
              ),
              e('a', {
                href: 'https://github.com/rselover',
                target: '_blank',
                rel: 'noopener noreferrer',
                style: {
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: '#333', color: '#fff',
                  padding: '6px 14px', borderRadius: '4px',
                  fontWeight: '700', fontSize: '13px', textDecoration: 'none'
                }
              },
                e('span', { className: 'material-icons', style: { fontSize: '16px' } }, 'code'),
                'GitHub'
              )
            )
          )
        )
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e(App));
