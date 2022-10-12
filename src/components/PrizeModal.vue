<script setup>
    import X from '../assets/x-protip.svg'
    import BgStars from './BgStars.vue';
        
        
        
        const emit = defineEmits(['close-prize']);
        
        
        </script>
        
        <template>
          <div class="modal">
            <div class="modal__content">
              <div class="close">
                <a href class="small-btn" @click.prevent="emit('close-prize')">
                  <img :src="X" alt="close" />Close Prizes & Odds
                </a>
            </div>
        
        
              <div class="modal__text">
              <h2 class="highlighted">Prizes & Odds</h2>
              <h3 >Prizes</h3>      
          
                  <table>
                    <tr>
                      <th>Play Type<br /><span>$1 play</span></th>
                      <th>Prize</th>
                      <th>Fireball Prize</th>
                    </tr>
                    <tr>
                      <td>Exact</td>
                      <td>$5,000</td>
                      <td>$1,350</td>
                    </tr>
                    <tr>
                      <td>Any (4-way)</td>
                      <td>$1,200</td>
                      <td>$340</td>
                    </tr>
                    <tr>
                      <td>Any (6-way)</td>
                      <td>$800</td>
                      <td>$224</td>
                    </tr>
                    <tr>
                      <td>Any (12-way)</td>
                      <td>$400</td>
                      <td>$112</td>
                    </tr>
                    <tr>
                      <td>Any (24-way)</td>
                      <td>$200</td>
                      <td>$56</td>
                    </tr>
                  </table>
    
                  <p> Fireball wins are separate and in addition to any Pick 4 base game wins. All prizes shown based on $1 Play. Visit <a href="https://nclottery.com/Pick4-How-to-Play" target="_blank">nclottery.com/Pick4-How-to-Play</a> for a list of prizes for additional Pick 4 play types as well as $0.50 Play prizes across all play types. </p>
    
                  <h3>Odds</h3>
    
                  <table>
                    <tr>
                      <th>Play Types</th>
                      <th>Odds</th>
                      <th>Fireball Odds</th>
                    </tr>
                    <tr>
                      <td>Exact</td>
                      <td>1:2,778</td>
                      <td>1:2,500</td>
                    </tr>
                    <tr>
                      <td>Any (4-way)</td>
                      <td>1:758</td>
                      <td>1:625</td>
                    </tr>
                    <tr>
                      <td>Any (6-way)</td>
                      <td>1:521</td>
                      <td>1:417</td>
                    </tr>
                    <tr>
                      <td>Any (12-way)</td>
                      <td>1:278</td>
                      <td>1:208</td>
                    </tr>
                    <tr>
                      <td>Any (24-way)</td>
                      <td>1:149</td>
                      <td>1:104</td>
                    </tr>
                  </table>
                  <p> The odds of winning Fireball vary by the unique numbers played. Visit <a href="https://nclottery.com/Pick4-How-to-Play" target="_blank">nclottery.com/Pick4-How-to-Play</a> to see odds for additional Pick 4 play types.</p>
    
    
              </div>
        
              <BgStars />
    
            </div>
          </div>
        </template>
        
        <style scoped>
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          overflow-y: scroll;
          background-color: var(--color-blue-shade);
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .modal::-webkit-scrollbar {
          display: none;
        }
            
        .modal__content {
          padding-top: 80px;
          min-height: 100%;
        }
        .modal__text {
          margin: 10px 32px 0 32px;
          padding-bottom: 50px;
        }
        
        .close {
            display: flex;
            justify-content: flex-end;
            margin-right: 8px;
        }
        
        p {
          font-family: 'Avenir Next', sans-serif;
          color: var(--vt-c-black);
          font-weight: bold;
          font-size: 14px;
          line-height: 1.2;
          margin: 20px 10px;
        }
        
        h2 {
          color: var(--color-gold);
          margin: 24px 0 8px;
        }
        
        h2.highlighted {
          color: var(--vt-c-white);
        }
        
        h2.highlighted span {
          color: var(--color-gold);
        }
    
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
    
        th {
          text-align: left;
          padding: 8px;
          background-color: var(--color-blue-shade);
          color: var(--color-gold);
          font-weight: bold;
          vertical-align: center;
          text-align: center;
    
        }
    
        td {
          padding: 8px;
          text-align: center;
          border-bottom: 1px solid #ddd;
          background-color: var(--color-blue-dark);
          color: var(--vt-c-white);
        }
    
        table span {
          font-size: 12px;
        }
    
        ul {
          margin: 20px 10px;
          padding: 0;
          list-style: none;
        }
        
       .modal__text a  {
          color: var(--vt-c-black);
          text-decoration: underline;
        }
       
        </style>
        
    