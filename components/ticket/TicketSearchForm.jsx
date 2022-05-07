import { Button, Card, Input, Space } from 'antd';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './styles/TicketSearchForm.module.css';
import LoadingSpinner from '../LoadingSpinner';

function TicketSearchForm() {
  const router = useRouter();
  const [ticketNo, setTicketNo] = useState();
  const [disabled, setDisabled] = useState(true);
  const [searching, setSearching] = useState(false);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setTicketNo(value);
    setDisabled(!(value.length > 8));
  };

  const onSearch = () => {
    setSearching(true);
    router.push(`/ticket/${ticketNo}`);
  };

  return (
    <LoadingSpinner tip="Searching..." size="large" spinning={searching}>
      <Card className={styles.card}>
        <Space
          direction="vertical"
          size="large"
          className={styles.card_content}
        >
          <div className={styles.top_text}>Ticket Search</div>
          <Input
            size="large"
            placeholder="Enter ticket number"
            value={ticketNo}
            className={styles.number_input}
            onChange={handleInputChange}
          />
          <Button
            type="primary"
            size="large"
            onClick={onSearch}
            disabled={disabled}
            className={styles.search_button}
          >
            Search
          </Button>
        </Space>
      </Card>
    </LoadingSpinner>
  );
}

export default TicketSearchForm;
