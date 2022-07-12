import logs from '../../resources/changelog.json'
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const ChangeLog = () => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-lg font-medium">Changelog</span>
      {logs.map((log, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="dark:text-white" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="dark:bg-dark02"
          >
            <div className="flex gap-2 dark:text-white">
              <span>{log.version}</span>
              <span>-</span>
              <span>{log.date}</span>
            </div>
          </AccordionSummary>
          <AccordionDetails className="dark:bg-dark03">
            <div className="dark:text-white">
              <div>
                {log.newFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-green-400 w-4">+</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div>
                {log.bugFixes.map((bug, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-red-400 w-4">-</span>
                    <span>{bug}</span>
                  </div>
                ))}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}