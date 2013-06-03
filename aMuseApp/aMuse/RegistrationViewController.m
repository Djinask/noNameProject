//
//  RegistrationViewController.m
//  aMuse
//
//  Created by simone on 13/05/13.
//  Copyright (c) 2013 simone. All rights reserved.
//

#import "RegistrationViewController.h"
#import "HudView.h"


@interface RegistrationViewController (){
    NSString *risultato;
    NSString *email;
    BOOL QRVisited;
}

@end

@implementation RegistrationViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{   [super viewDidLoad];
    UIImage *back =[UIImage imageNamed:@"Beach"];
        [self.view setBackgroundColor:[[UIColor alloc]initWithPatternImage:back]];

    
    risultato = [[NSString alloc] init];
    email = [[NSString alloc] init];
    self.emailTextField.delegate = self;
    //QRVisited = [[NSUserDefaults standardUserDefaults] boolForKey:@"QRVisited"];
    if (QRVisited){
        [self QRcorretto];
    }else{
        self.risultatoCorretto.hidden = YES;
        self.emailTextField.hidden = YES;
    }
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}


- (IBAction)scanQRCode{
    ZBarReaderViewController *scanner = [ZBarReaderViewController new];
    scanner.readerDelegate = self;
    scanner.supportedOrientationsMask = ZBarOrientationMaskAll;
    ZBarImageScanner *imagescanner = scanner.scanner;
    [imagescanner setSymbology: 0
                   config: ZBAR_CFG_ENABLE
                       to: 0];
    [imagescanner setSymbology: ZBAR_QRCODE
                   config: ZBAR_CFG_ENABLE
                       to: 1];
    QRVisited = YES;
    [self presentViewController:scanner animated:YES completion:nil];

}
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info{
    id<NSFastEnumeration> results = [info objectForKey:ZBarReaderControllerResults];
    ZBarSymbol *symbol = nil;
    for(symbol in results)
        break;
    risultato = symbol.data;
    if ([risultato isEqualToString:@"Registrazione aMuse"]){
        [self dismissModalViewControllerAnimated:YES];
        [self QRcorretto];
    } else{
        NSLog(@"Errore");
        NSLog(@"QR errato");
    }
}

-(void)QRcorretto{
    self.risultatoCorretto.hidden = NO;
    self.emailTextField.hidden = NO;
    self.messaggio.hidden = YES;
    self.bottoneQR.hidden = YES;
    QRVisited = YES;
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setBool:QRVisited forKey:@"QRVisited"];
}

-(BOOL)textFieldShouldReturn:(UITextField *)textField{
        [self confirmRegistration];
        [textField resignFirstResponder];
        return YES;
}


- (IBAction)goHome{
    [self.navigationController popToViewController:[self.navigationController.viewControllers objectAtIndex:0] animated:YES];
}

- (void)confirmRegistration{
    self.cancelButton.enabled = NO;
    [self.emailTextField resignFirstResponder];
    NSString *urlString = [NSString stringWithFormat:@"http://a-muse.herokuapp.com/mobileapi/register"];
    NSURL *url = [NSURL URLWithString:urlString];
    ASIFormDataRequest *request = [ASIFormDataRequest requestWithURL:url];
    [request setRequestMethod:@"POST"];
    [request setPostValue:self.emailTextField.text forKey:@"email"];
    [request setDelegate:self];
    [request startAsynchronous];
}

-(void)removeInfoHud{
    UIView * subview = nil;
    NSLog(@"Entrato");
    for (subview in [self.navigationController.view subviews]){
        if (subview.tag == 100) {
            NSLog(@"Entrato nel ciclo");
            [subview removeFromSuperview];
            self.navigationController.view.userInteractionEnabled = YES;
            self.cancelButton.enabled = YES;
            [self goHome];
        }
    }
    
}



-(void)requestFinished:(ASIHTTPRequest *)request{
    //controllo la risposta del server
        //risposta positiva
    if([request.responseString isEqualToString:@"success"]){
        UIImage *successImage = [UIImage imageNamed:@"success.png"];
        HudView *hudView = [HudView hudInView:self.navigationController.view animated:YES disappear:YES withImage:successImage];
        hudView.text = @"Successo";
        hudView.tag = 100;
        [self performSelector:@selector(removeInfoHud) withObject:nil afterDelay:0.6];
    } else {
        //risposta negativa
        [self.emailTextField becomeFirstResponder];
        NSString *message;
        if ([[request responseString] isEqualToString:@"not-valid"]){
            message = [NSString stringWithFormat:@"L'email inserita non è valida.\nSi prega di ricontrollare"];
        } else if( [[request responseString] isEqualToString:@"already-used"]){
            message = [NSString stringWithFormat:@"L'email inserita è già utilizzata"];
        } else{
            message = [NSString stringWithFormat:@"Problema di connessione. Ritenta"];
        }
        self.risultatoCorretto.text = message;
        self.cancelButton.enabled = YES;
    }
}

-(void)requestFailed:(ASIHTTPRequest *)request{
    UIAlertView *error = [[UIAlertView alloc] initWithTitle:@"Errore di Connessione" message:@"Impossibile effettuare la richiesta. Sicuro di essere connesso?" delegate:nil cancelButtonTitle:@"Ok" otherButtonTitles: nil];
    [error show];
    self.cancelButton.enabled = YES;

}

@end
