import EmailsTableData from '@/features/emailsTableData/EmailsTableData';

import classes from './EmailPage.module.scss';

export default function EmailPage() {
  return (
    <div className={classes['email-page']}>
      <EmailsTableData />
    </div>
  );
}
